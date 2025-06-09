import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { postAPI } from "@/utils/apiRequest";
import { LOGIN } from "@/app/api/index";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                CompanyCode: { label: "Plant ID", type: "text" },
                UserName: { label: "Username", type: "text" },
                Password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const finalData = {
                        CompanyCode: credentials.CompanyCode || "SUN",
                        UserName: credentials.UserName,
                        Password: credentials.Password,
                    };

                    const res = await postAPI(LOGIN, finalData);
                    const data = res.data;

                    if (res.status !== 200 || !data?.user) {
                        throw new Error("Invalid credentials");
                    }

                    return {
                        id: data.user._id,
                        status: res.status,
                        message: res.message,
                        name: data.user.UserName,
                        email: data.user.UserName,
                        token: data.access.token,
                        refreshToken: data.refresh.token,
                        role: data.user.role,
                        userModules: data.userModules,
                        pageRights: data.pageRights,
                        CurrentCompany: data.user.CompanyCode,
                    };
                } catch (error) {
                    throw new Error(error.message);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token = {
                    ...token,
                    message: user.message,
                    accessToken: user.token,
                    refreshToken: user.refreshToken,
                    role: user.role,
                    userModules: user.userModules,
                    pageRights: user.pageRights,
                    CurrentCompany: user.CurrentCompany,
                    id: user.id,
                };
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                ...session.user,
                id: token.id,
                role: token.role,
            };
            session.message = token.message;
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            session.userModules = token.userModules;
            session.pageRights = token.pageRights;
            session.CurrentCompany = token.CurrentCompany;
            return session;
        },
    },
    pages: {
        signIn: "/login",
        signOut: "/login",
    },
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
    session: {
        strategy: "jwt",
    },
};

export default NextAuth(authOptions);
