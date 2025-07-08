import { Navbar } from "./_components/Navbar";
import ScrollProgressBar from "@/components/ui/scroll-progress-bar";

export default function LayoutPublic({ children }: { children: React.ReactNode }) {
    return (
        <div>
           <ScrollProgressBar />
           <Navbar />
            <main className="container mx-auto px-4 md:px-6 lg:px-8">{children}</main>
        </div>
    )
}