

# Sveltekit Responsive Dashboard

Uses SvelteKit, Supabase, Bootstrap 5

[Click here to watch demo](https://www.youtube.com/watch?v=KniBym_hbYk)

# Screenshots

Here are some screenshots of the project:

## Login
![Screenshot 1](screenshots/8.png)

## Registration
![Screenshot 1](screenshots/9.png)

## Home page
![Screenshot 1](screenshots/1.png)

## Add modal
![Screenshot 2](screenshots/2.png)

## Menu actions
![Screenshot 3](screenshots/3.png)

## Edit modal
![Screenshot 4](screenshots/4.png)

## Responsive mobile sidebar
![Screenshot 5](screenshots/5.png)

## Profile page
![Screenshot 6](screenshots/6.png)

## Sortable columns
![Screenshot 7](screenshots/7.png)


Thanks to:
Jason Creviston
https://github.com/j4w8n/sveltekit-supabase-ssr

## Features

- Email sign-up/sign-in.
- Requires a session to access all pages under the `authenticated` layout group.
- Add, change, remove custom `nickname` user_metadata on the `/profile` page.
- All sign-up and sign-ins happen server-side.
- Responsive design 
- Bootstrap Modals, Toasts
- Server side search
- Server side pagination

## Prerequisites

1. A Supabase account.
2. A Supabase project.
3. Create expenses table in supabase with id, activity, created_at, user_id, amount columns

## Install

```
npm install
```

## Setup

1. Environment variables.
    
    Rename the `.env.example` file to `.env.local` in your project's root directory and assign values, which can be found in your Supabase project's dashboard at Project Settings > API. 

2. If using OAuth or Email/Password features, enable Email and GitHub as providers.

    Login to your Supabase dashboard, then go to your project > Authentication > Providers

## Run!

```
npm run dev
```

Open a browser to http://localhost:5173
