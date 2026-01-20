import { FaqProp } from "../shared/faq";

export const FAQ = () => {
    const faqHome = [
        {
            question: "How does the 14-day free trial work?",
            answer:
                "Start using all features immediately with no credit card required. After 14 days, choose a plan that fits your business needs or continue with our free tier.",
        },
        {
            question: "Can I manage both my fashion design and cobbler business?",
            answer:
                "We offer photography, videography, live streaming, drone coverage, event recap videos, and on-site editing to ensure your event is professionally captured from every angle.",
        },
        {
            question: "How do I take customer measurements digitally?",
            answer:
                "Absolutely! We understand that every client is unique, so we offer customizable packages tailored to your event size, duration, and specific media needs.",
        },
        {
            question: "Is my customer data secure?",
            answer:
                "Turnaround time typically ranges from 3 to 7 business days, depending on the service. For larger events or projects, we’ll communicate an estimated delivery timeline upfront.",
        },
        {
            question: "Can I integrate with my existing tools?",
            answer:
                "We use industry-standard equipment, including Canon and Sony cameras, DJI drones, professional lighting, stabilizers, and audio gear to ensure high-quality production.",
        },
        {
            question: "What kind of support do you offer?",
            answer:
                "We use industry-standard equipment, including Canon and Sony cameras, DJI drones, professional lighting, stabilizers, and audio gear to ensure high-quality production.",
        },
    ];
    return (
        <>
            <FaqProp faqs={faqHome} />
        </>
    )
}