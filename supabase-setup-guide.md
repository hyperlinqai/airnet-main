# Supabase Setup Guide

This guide will help you set up your Supabase connection for this project.

## Environment Variables

Create a `.env` file in the root of your project with the following variables:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://wfkxmuxcjmiphmjssjni.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Database URL for Prisma
DATABASE_URL=postgresql://postgres:your_database_password_here@wfkxmuxcjmiphmjssjni.supabase.co:5432/postgres
```

Replace:
- `your_supabase_anon_key_here` with your Supabase anon/public key
- `your_database_password_here` with your Supabase database password

## Getting Your Supabase Keys

1. Log in to your Supabase dashboard
2. Go to Project Settings > API
3. Copy the "Project URL" and "anon/public" key
4. For the database password, go to Project Settings > Database > Connection Info

## Prisma Setup

After setting up your environment variables, run:

```
npx prisma generate
```

This will generate the Prisma client based on your schema and the new database connection.

## Testing the Connection

To test your Supabase connection, you can run:

```
npx prisma db pull
```

This will introspect your database and update your Prisma schema if needed.
