"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import { importEmail } from "@/services/api";

export default function ImportEmailPage() {

    const router = useRouter();

    const [emailFile, setEmailFile] = useState<File>();

    const [loading, setLoading] = useState(false);
    
    const [progress, setProgress] = useState(0);

    const [error, setError] = useState("");

    async function handleImport() {

    if (!emailFile) {

        alert("Please choose a .eml email.");

        return;

    }

    setLoading(true);

    setProgress(1);

    setError("");

    let interval: NodeJS.Timeout;

    interval = setInterval(() => {

        setProgress((current) => {

            if (current >= 90) {

                return current;

            }

            return current + 1;

        });

    }, 1500);

    try {

        const formData = new FormData();

        formData.append(
            "email_file",
            emailFile,
        );

        await importEmail(
            formData,
        );

        setProgress(100);

        alert(
            "Maintenance email imported successfully.",
        );

        router.push("/manager");

    }

    catch (err: any) {

        if (err?.response?.data?.detail) {

            setError(
                err.response.data.detail,
            );

        }

        else {

            setError(
                "Unable to import email.",
            );

        }

    }

    finally {

        clearInterval(interval);

        setLoading(false);

        setProgress(0);

    }

}

    return (

        <>

            <Navbar />

            <main className="mx-auto max-w-5xl p-8">

                <Link
                    href="/manager"
                    className="text-cyan-400 hover:underline"
                >
                    ← Back to Dashboard
                </Link>

                <h1 className="mt-6 text-4xl font-bold text-white">

                    📧 Import Maintenance Email

                </h1>

                <p className="mt-3 max-w-3xl text-slate-400">

                    Import a maintenance request directly from an email.

                    The AI will automatically extract the resident's description,

                    retrieve the attached maintenance image,

                    perform the complete multi-agent analysis,

                    and create a new maintenance ticket.

                </p>

                <section className="mt-10 rounded-xl border border-slate-800 bg-slate-900 p-8">

                    <h2 className="text-2xl font-semibold text-white">

                        Upload Email

                    </h2>

                    <p className="mt-2 text-slate-400">

                        Supported format

                        <span className="ml-2 rounded bg-cyan-900/40 px-2 py-1 text-cyan-300">

                            .eml

                        </span>

                    </p>

                    <input

                        type="file"

                        accept=".eml"

                        className="mt-6 block w-full rounded-lg border border-slate-700 bg-slate-800 p-4 text-white"

                        onChange={(e) =>

                            setEmailFile(
                                e.target.files?.[0],
                            )

                        }

                    />

                    {

                        emailFile && (

                            <div className="mt-4 rounded-lg bg-slate-800 p-4">

                                <p className="text-green-300">

                                    ✓ Selected file

                                </p>

                                <p className="mt-1 text-slate-300">

                                    {emailFile.name}

                                </p>

                            </div>

                        )

                    }

                    {

                        error && (

                            <div className="mt-5 rounded-lg border border-red-800 bg-red-900/30 p-4 text-red-300">

                                {error}

                            </div>

                        )

                    }

                    <button

                        disabled={loading}

                        onClick={handleImport}

                        className="mt-8 rounded-lg bg-cyan-600 px-8 py-3 font-semibold text-white hover:bg-cyan-700 disabled:bg-slate-700"

                    >

                        {

                            loading

                                ? "Importing Email..."

                                : "Import Maintenance Email"

                        }

                    </button>

                    {
    loading && (

        <div className="mt-6">

            <div className="mb-2 flex justify-between text-sm text-slate-400">

                <span>

                    Running AI analysis...

                </span>

                <span>

                    {progress}%

                </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-800">

                <div

                    className="h-full bg-cyan-500 transition-all duration-500"

                    style={{
                        width: `${progress}%`,
                    }}

                />

            </div>

            <p className="mt-3 text-sm text-slate-400">
    Please do not close this page while the email is being imported. This may take 90–120 seconds. 
</p>

        </div>

    )
}

                </section>

                <section className="mt-10 rounded-xl border border-slate-800 bg-slate-900 p-8">

                    <div className="flex items-center justify-between">

                        <h2 className="text-2xl font-semibold text-white">

                            Try it out!

                        </h2>

                        <span className="rounded-full bg-cyan-900/40 px-4 py-2 text-sm font-medium text-cyan-300">

                            Demo Sample Emails

                        </span>

                    </div>

                    <p className="mt-3 text-slate-400">

                        Download one of these realistic maintenance emails and import it to experience the complete AI workflow from email to maintenance ticket.

                    </p>

                    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

                        <a
                            href="/samples/normal_request.eml"
                            download
                            className="rounded-lg border border-slate-700 bg-slate-800 p-5 hover:border-cyan-500"
                        >
                            <h3 className="font-semibold text-white">
                                Normal Request
                            </h3>

                            <p className="mt-2 text-sm text-slate-400">
                                Matching description and attached maintenance photo.
                            </p>

                        </a>

                        <a
                            href="/samples/mismatch_example.eml"
                            download
                            className="rounded-lg border border-slate-700 bg-slate-800 p-5 hover:border-cyan-500"
                        >
                            <h3 className="font-semibold text-white">
                                Mismatch Example
                            </h3>

                            <p className="mt-2 text-sm text-slate-400">
                                Description does not match the attached image.
                            </p>

                        </a>

                        <a
                            href="/samples/limited_description.eml"
                            download
                            className="rounded-lg border border-slate-700 bg-slate-800 p-5 hover:border-cyan-500"
                        >
                            <h3 className="font-semibold text-white">
                                Image Only
                            </h3>

                            <p className="mt-2 text-sm text-slate-400">
                                Very limited description with an attached photo.
                            </p>

                        </a>

                        <a
    href="/samples/no_image.eml"
    download
    className="rounded-lg border border-slate-700 bg-slate-800 p-5 hover:border-cyan-500"
>
    <h3 className="font-semibold text-white">
        No Image
    </h3>

    <p className="mt-2 text-sm text-slate-400">
        Contains a maintenance description but no image attachment.
    </p>

</a>

                    </div>

                </section>

                <div className="mt-8 rounded-xl border border-slate-700 bg-slate-900 p-6">

                    <h3 className="text-lg font-semibold text-white">

                        Before You Upload

                    </h3>

                    <ul className="mt-4 space-y-3 text-slate-300">

                        <li>
                            ✓ Supports Outlook, Gmail and most email clients that export <strong>.eml</strong> files.
                        </li>

                        <li>
                            ✓ A maintenance image attachment is <strong>required</strong> for AI analysis.
                        </li>

                        <li>
                            ✓ The resident's email body will automatically become the maintenance description.
                        </li>

                        <li>
                            ✓ Unit numbers found in the email subject or body will be extracted automatically.
                        </li>

                        <li>
                            ✓ If multiple images are attached, only the first supported image (JPG, JPEG, PNG or WEBP) will be analysed.
                        </li>

                        <li>
                            ✓ Non-image attachments such as PDF, Word, Excel or ZIP files are ignored automatically.
                        </li>

                        <li>
                            ✓ Emails without a supported image attachment cannot be imported.
                        </li>

                    </ul>

                </div>

            </main>

        </>

    );

}