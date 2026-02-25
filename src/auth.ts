import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login"
    },

    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                const response = await fetch(`${process.env.API}/auth/signin`, {
                    method: "POST",
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: { "Content-Type": "application/json" }
                });

                const payload = await response.json();

                if (payload.message === "success") {
                    // استخراج الـ id من الـ token المشفر
                    const decoded: { id: string } = jwtDecode(payload.token);
                    
                    // نرجع الكائن اللي هيستلمه الـ jwt callback باسم 'user'
                    return {
                        id: decoded.id,
                        user: payload.user, // بيحتوي على name, email, role
                        token: payload.token
                    };
                } else {
                    throw new Error("Invalid Email or Password");
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user, trigger, session }) {
            // يتم تنفيذه عند تسجيل الدخول فقط
            if (user) {
                token.id = user.id;
                token.user = user.user;
                token.token = user.token;
            }

            // تحديث البيانات يدوياً إذا استخدمت update()
            if (trigger === "update" && session) {
                token.user = { ...token.user, ...session.user };
            }

            return token;
        },

        async session({ session, token }) {
            // هنا نمرر البيانات من الـ JWT إلى الـ Session اللي بيشوفها الـ Client
            if (token) {
                session.user = {
                    ...token.user,
                    id: token.id // دمج الـ id مع بيانات المستخدم
                };
                session.token = token.token;
            }
            return session;
        }
    },
    // يفضل إضافة secret لتأمين التوكن
    secret: process.env.NEXTAUTH_SECRET,
};