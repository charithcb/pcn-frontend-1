import { useState } from "react";
import { Button, TextInput, Label, Card } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuthStore();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("/auth/login", { email, password });
            login(res.data.token, res.data.user);
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            alert("Login failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <Card className="w-[400px]">
                <h1 className="text-2xl font-semibold mb-3">Login</h1>

                <div>
                    <Label>Email</Label>
                    <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div>
                    <Label>Password</Label>
                    <TextInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <Button onClick={handleLogin} color="purple">
                    Login
                </Button>

                <p className="text-center text-sm">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-purple-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </Card>
        </div>
    );
}


