import { FaqProp } from "../shared/faq";

export const FAQ = () => {
    const faqFashion = [
        {
            question: "What types of fashion businesses can use Silverspoon?",
            answer:
                "Silverspoon is designed for all fashion professionals including bespoke tailors, ready-to-wear designers, made-to-order creators, fashion houses, and boutique owners. Our platform adapts to your specific business model.",
        },
        {
            question: "How does the measurement tracking feature work?",
            answer:
                "Silverspoon is designed for all fashion professionals including bespoke tailors, ready-to-wear designers, made-to-order creators, fashion houses, and boutique owners. Our platform adapts to your specific business model.",
        },
        {
            question: "Can I manage my team and vendors on Silverspoon?",
            answer:
                "Silverspoon is designed for all fashion professionals including bespoke tailors, ready-to-wear designers, made-to-order creators, fashion houses, and boutique owners. Our platform adapts to your specific business model.",
        },
        {
            question: "Does Silverspoon integrate with payment providers?",
            answer:
                "Silverspoon is designed for all fashion professionals including bespoke tailors, ready-to-wear designers, made-to-order creators, fashion houses, and boutique owners. Our platform adapts to your specific business model.",
        },
        {
            question: "Can I integrate with my existing tools?",
            answer:
                "Silverspoon is designed for all fashion professionals including bespoke tailors, ready-to-wear designers, made-to-order creators, fashion houses, and boutique owners. Our platform adapts to your specific business model.",
        },
        {
            question: "How can I use Silverspoon for marketing?",
            answer:
                "Silverspoon is designed for all fashion professionals including bespoke tailors, ready-to-wear designers, made-to-order creators, fashion houses, and boutique owners. Our platform adapts to your specific business model.",
        }, 
          {
            question: "Is there a mobile app available?",
            answer:
                "Silverspoon is designed for all fashion professionals including bespoke tailors, ready-to-wear designers, made-to-order creators, fashion houses, and boutique owners. Our platform adapts to your specific business model.",
        },
    ];
    return (
        <>
            <FaqProp faqs={faqFashion} />
        </>
    )
}