import Navbar from "@/components/Navbar";
import TicketForm from "@/components/TicketForm";

export default function ResidentPage() {

    return (

        <>

            <Navbar />

            <main className="max-w-4xl mx-auto py-10 text-white">

                <h1 className="text-4xl font-bold">

                    Submit a Maintenance Request

                </h1>

                <p className="text-slate-400 mt-2 mb-8">

                    Complete the form below and our multi-agent AI system will analyse your maintenance issue.

                </p>

                <TicketForm />

            </main>

        </>

    );

}