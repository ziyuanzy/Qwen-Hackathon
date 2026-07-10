type Props = {

    text: string;

};

export default function StatusBadge({

    text,

}: Props) {

    let colour =
        "bg-gray-100 text-gray-700";

    switch (text) {

        case "Critical":

            colour =
                "bg-red-100 text-red-700";

            break;

        case "High":

            colour =
                "bg-orange-100 text-orange-700";

            break;

        case "Medium":

            colour =
                "bg-yellow-100 text-yellow-700";

            break;

        case "Low":

            colour =
                "bg-green-100 text-green-700";

            break;

        case "Pending":

            colour =
                "bg-yellow-100 text-yellow-700";

            break;

        case "In Progress":

            colour =
                "bg-blue-100 text-blue-700";

            break;

        case "Completed":

            colour =
                "bg-green-100 text-green-700";

            break;

    }

    return (

        <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${colour}`}
        >

            {text}

        </span>

    );

}