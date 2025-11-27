import { Navbar, NavbarBrand, NavbarToggle, Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar fluid rounded className="border-b shadow-sm">
                <NavbarBrand href="/">
                    <span className="self-center whitespace-nowrap text-2xl font-semibold text-gray-900">
                        PCN Inventory
                    </span>
                </NavbarBrand>

                <div className="flex md:order-2 gap-2">
                    <Link to="/login">
                        <Button color="light">Login</Button>
                    </Link>

                    <Link to="/signup">
                        <Button color="purple">Sign Up</Button>
                    </Link>
                    <NavbarToggle />
                </div>
            </Navbar>

            <div className="flex flex-col items-center justify-center mt-32 space-y-6">
                <h1 className="text-5xl font-semibold tracking-tight text-gray-900">
                    Your Trusted Vehicle Inventory System
                </h1>

                <p className="text-gray-600 text-lg">
                    Manage vehicles, customers, orders, tracking, and more — all in one place
                </p>

                <Link to="/signup">
                    <Button size="xl" color="purple">
                        Get Started
                    </Button>
                </Link>
            </div>
        </div>
    );
}




