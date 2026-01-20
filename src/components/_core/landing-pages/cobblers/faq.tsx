import { FaqProp } from "../shared/faq"

export const FAQ = () => {
    const faqCobblers = [
        {
            question: "What types of fashion businesses can use Silverspoon?",
            answer:
                "Silverspoon is designed for all fashion professionals including bespoke tailors, cobblers, ready-to-wear designers, made-to-order creators, fashion houses, and boutique owners. The platform adapts to different workflows, whether you work solo or manage a growing team.",
        },
        {
            question: "How does the measurement tracking feature work?",
            answer:
                "Silverspoon allows you to securely save and manage customer measurements digitally. You can record measurements manually, update them over time, attach notes or photos, and reuse them for future orders. This reduces errors, saves time, and ensures consistency across repeat jobs.",
        },
        {
            question: "Can I manage my team and vendors on Silverspoon?",
            answer:
                "Yes. Silverspoon helps you organize your team by assigning roles, tracking responsibilities, and monitoring progress on orders. You can also manage external vendors or suppliers by keeping records, tracking delivery status, and maintaining clear communication.",
        },
        {
            question: "Does Silverspoon integrate with payment providers?",
            answer:
                "Silverspoon supports integration with popular payment providers, allowing you to receive deposits and full payments seamlessly. This makes it easier to track transactions, confirm orders, and maintain accurate financial records for your business.",
        },
        {
            question: "Can I integrate with my existing tools?",
            answer:
                "Yes. Silverspoon is built to work alongside tools you already use, such as accounting software, messaging platforms, and inventory systems. This ensures a smooth workflow without forcing you to abandon your existing setup.",
        },
        {
            question: "How can I use Silverspoon for marketing?",
            answer:
                "You can use Silverspoon to build stronger customer relationships by tracking client history, sending updates, and showcasing completed work. These insights help you offer personalized experiences, encourage repeat customers, and promote your brand more effectively.",
        },
        {
            question: "Is there a mobile app available?",
            answer:
                "Silverspoon is accessible on mobile devices, allowing you to manage orders, view measurements, communicate with clients, and track progress on the go. This ensures flexibility whether you’re in the workshop, at a fitting, or outside your shop.",
        },
    ];

    return (
        <>
            <FaqProp faqs={faqCobblers} />
        </>
    )
}