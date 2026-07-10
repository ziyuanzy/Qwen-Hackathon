export function openGmail(
    subject: string,
    body: string,
) {

    const url =
        "https://mail.google.com/mail/?view=cm&fs=1" +
        `&su=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

    window.open(
        url,
        "_blank",
    );

}

export function openOutlook(
    subject: string,
    body: string,
) {

    const url =
        "https://outlook.office.com/mail/deeplink/compose" +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

    window.open(
        url,
        "_blank",
    );

}

export async function copyEmail(
    text: string,
) {

    await navigator.clipboard.writeText(text);

    alert("Email copied to clipboard.");

}