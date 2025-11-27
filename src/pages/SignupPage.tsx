import { useState } from "react";
import { Button, TextInput, Label, Card } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import useAuthStore from "../stores/authStore";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useAuthStore();
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const res = await axios.post("/auth/register", { name, email, password });
            setUser(res.data.user);
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            alert("Signup failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <Card className="w-[400px]">
                <h1 className="text-2xl font-semibold mb-3">Create Account</h1>

                <div>
                    <Label>Name</Label>
                    <TextInput value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                    <Label>Email</Label>
                    <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div>
                    <Label>Password</Label>
                    <TextInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <Button onClick={handleSignup} color="purple">
                    Sign Up
                </Button>

                <p className="text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-purple-600 hover:underline">
                        Login
                    </Link>
                </p>
            </Card>
        </div>
    );
}

