import Input from "@/components/Input";
import {useState} from "react";

const Auth = () => {
    const [email, setEmail] = useState('121212');
    const [name, setName] = useState('121212');
    const [pass, setPass] = useState('000');

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-12">
                    <img src="/images/logo.png" alt="Logo" className="h-12"/>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            Sign in
                        </h2>
                        <div className="flex flex-col gap-4">
                            <Input
                                label="Username"
                                onChange={(e) => setName(e.target.value)}
                                id="name"
                                value={name}
                            />
                            <Input
                                label="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                type="email"
                                value={email}
                            />
                            <Input
                                label="Password"
                                onChange={(e) => setPass(e.target.value)}
                                id="password"
                                type="password"
                                value={pass}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;