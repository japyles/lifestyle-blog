import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is where you would typically check against your database
        if (credentials.username === "admin" && credentials.password === "password") {
          return { id: 1, name: "Admin" }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
})

