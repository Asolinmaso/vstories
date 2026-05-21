import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const envFile = fs.readFileSync('.env', 'utf8');
const urlMatch = envFile.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
const keyMatch = envFile.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/);

const supabaseUrl = urlMatch ? urlMatch[1].trim() : '';
const supabaseKey = keyMatch ? keyMatch[1].trim() : '';

const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
});

async function createAdmin() {
    const email = 'admin@vstories.com';
    const password = 'AdminPassword123!';

    console.log(`Checking if ${email} exists...`);

    const { data: user, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true,
        user_metadata: { full_name: 'System Admin' }
    });

    let userId;

    if (authError) {
        if (authError.message.includes('already') || authError.message.includes('registered')) {
            console.log('User already exists, fetching user...');
            const { data: users } = await supabaseAdmin.auth.admin.listUsers();
            const existingUser = users.users.find(u => u.email === email);
            if (existingUser) {
                userId = existingUser.id;
                // update password just in case
                await supabaseAdmin.auth.admin.updateUserById(userId, { password: password });
            }
        } else {
            console.error('Error creating user:', authError);
            return;
        }
    } else {
        console.log('User created successfully.');
        userId = user.user.id;
    }

    if (userId) {
        console.log('Updating profile role to admin...');
        const { error: profileError } = await supabaseAdmin.from('profiles').upsert({
            id: userId,
            full_name: 'System Admin',
            role: 'admin'
        });

        if (profileError) {
            console.error('Error updating profile:', profileError);
        } else {
            console.log('Success! Admin role assigned.');
        }
    }
}

createAdmin();
