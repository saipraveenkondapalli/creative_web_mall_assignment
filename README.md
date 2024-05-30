This Project is part of Creative Web Mall Interview Process for the Next.js Developer Role.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Environmental Variables

Create a `.env.local` file in the root of the project and add the following variables:

```
NEXTAUTH_SECRET=
MONGO_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

# About the Project

The project is a simple student data saving application. The website allows the users to save, update and delete student
data.

# Technologies Used

1. Next.js
2. MongoDB
3. NextAuth.js
4. Tailwind CSS
5. SWR
6. Headless UI
7. Formik

# Routes

| Route                   | Description                  | Protected |
|-------------------------|------------------------------|-----------|
| /                       | Home Page                    | No        |
| /login                  | Login Page with google       | No        |
| /dashboard              | Students Data Page           | Yes       |
| /dashboard/student      | New Student Application Page | Yes       |
| /dashboard/student/[id] | Update Student Page          | Yes       |
| /api/auth/*             | NextAuth API                 | No        |
| /api/student/*          | Student CRUD operations API  | Yes       |

# External Api

1. Postal Pin Code Api
    - https://api.postalpincode.in/pincode/{pincode}
    - This api is used to get the state and city of the pin code entered by the user in the student form.

# Screenshots

1. Home Page
   ![Home Page](/example/images/home.png)
2. Login Page
   ![Login Page](/example/images/login.png)
3. Dashboard Page
   ![Dashboard Page](/example/images/dashboard.png)
4. Student Detail View
   ![Student Detail View](/example/images/student-details.png)
5. Student Delete View
   ![Student Delete View](/example/images/student-delete.png)
6. Student Form Page (New Student)
   ![Student Form Page](/example/images/student.png)
7. Student Form Page (Update Student)
   ![Student Form Page](/example/images/student-edit.png)
8. Unauthorized Page View (If user is not logged in)
   ![Unauthorized Page](/example/images/unauthorized.png)