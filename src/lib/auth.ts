import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { supabase } from "./supabase";
import { createClient } from "@supabase/supabase-js";

// Admin client for user management
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email as string,
          password: credentials.password as string,
        });

        if (error || !data.user) {
          return null;
        }

        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.full_name || data.user.email,
        };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          // Check if user exists in Supabase auth by email
          const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
          const existingUser = existingUsers?.users.find(u => u.email === user.email);
          
          let supabaseUserId: string;
          
          if (!existingUser) {
            // User doesn't exist in Supabase auth, create them
            const defaultPassword = `${user.email}@vstories`;
            
            const { data: newUser, error: signUpError } = await supabaseAdmin.auth.admin.createUser({
              email: user.email!,
              password: defaultPassword,
              email_confirm: true,
              user_metadata: {
                full_name: user.name || user.email?.split("@")[0],
                provider: "google",
              },
            });

            if (signUpError) {
              console.error("Error creating Supabase user:", signUpError);
              return false;
            }

            supabaseUserId = newUser.user.id;

            // Create profile
            await supabaseAdmin.from("profiles").insert({
              id: supabaseUserId,
              email: user.email,
              full_name: user.name || user.email?.split("@")[0],
              role: "user",
            });
            
            console.log(`New user created via Google: ${user.email} with password: ${user.email}@vstories`);
          } else {
            supabaseUserId = existingUser.id;
            
            // User exists, check if profile exists
            const { data: existingProfile } = await supabaseAdmin
              .from("profiles")
              .select("id")
              .eq("email", user.email)
              .single();

            if (!existingProfile) {
              // Create profile if it doesn't exist
              await supabaseAdmin.from("profiles").insert({
                id: supabaseUserId,
                email: user.email,
                full_name: user.name || user.email?.split("@")[0],
                role: "user",
              });
            }
          }
          
          // Store Supabase user ID in NextAuth user object
          user.id = supabaseUserId;
          
        } catch (error) {
          console.error("Error in Google sign-in callback:", error);
          return false;
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // After successful Google login, redirect to our success page
      if (url.includes('/api/auth/callback/google')) {
        return `${baseUrl}/auth/google-success`;
      }
      // If url is relative, prepend baseUrl
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // If url is on same origin, allow it
      else if (new URL(url).origin === baseUrl) return url;
      // Otherwise redirect to profile
      return `${baseUrl}/profile`;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
});
