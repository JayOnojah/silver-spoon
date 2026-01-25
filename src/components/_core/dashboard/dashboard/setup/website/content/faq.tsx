"use client";

import { useState } from "react";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const Faq = () => {
  const [showFAQ, setShowFAQ] = useState(false);
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: "1",
      question: "How long does it take to complete an order?",
      answer: "Turnaround time varies by design complexity...",
    },
    {
      id: "2",
      question: "Do you offer rush orders?",
      answer: "Yes, rush orders are available with additional fees...",
    },
    {
      id: "3",
      question: "Do you offer rush orders?",
      answer: "Yes, rush orders are available with additional fees...",
    },
    {
      id: "4",
      question: "Do you offer rush orders?",
      answer: "Yes, rush orders are available with additional fees...",
    },
  ]);

  const handleAddFAQ = () => {
    const newFAQ: FAQ = {
      id: Date.now().toString(),
      question: "",
      answer: "",
    };
    setFaqs([...faqs, newFAQ]);
  };

  const handleDeleteFAQ = (id: string) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
  };

  const handleFAQChange = (id: string, field: keyof FAQ, value: string) => {
    setFaqs(
      faqs.map((faq) => (faq.id === id ? { ...faq, [field]: value } : faq)),
    );
  };

  return (
    <div className="space-y-6">
      {/* FAQ Section Header with Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">FAQ Section</h3>
        <div className="flex items-center gap-3">
          <Label
            htmlFor="show-faq"
            className="text-sm text-[#4B5565] cursor-pointer"
          >
            Show on website
          </Label>
          <Switch
            id="show-faq"
            checked={showFAQ}
            onCheckedChange={setShowFAQ}
          />
        </div>
      </div>

      {/* FAQ Entries */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="border border-[#E5E7EB] rounded-xl p-4 space-y-4 bg-white"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-4">
                {/* Question Field */}
                <div className="space-y-2">
                  <Label className="text-[#4B5565] text-sm">Question</Label>
                  <Input
                    value={faq.question}
                    onChange={(e) =>
                      handleFAQChange(faq.id, "question", e.target.value)
                    }
                    placeholder="Enter question"
                    className="h-11 rounded-xl"
                  />
                </div>

                {/* Answer Field */}
                <div className="space-y-2">
                  <Label className="text-[#4B5565] text-sm">Answer</Label>
                  <Textarea
                    value={faq.answer}
                    onChange={(e) =>
                      handleFAQChange(faq.id, "answer", e.target.value)
                    }
                    placeholder="Enter answer"
                    className="min-h-24 rounded-xl resize-none"
                  />
                </div>
              </div>

              {/* Delete Button */}
              {faqs.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteFAQ(faq.id)}
                  className="h-9 w-9 text-[#9AA4B2] hover:text-destructive hover:bg-destructive/10 shrink-0"
                >
                  <IconTrash className="size-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add FAQ Button */}
      <Button
        type="button"
        variant="ghost"
        onClick={handleAddFAQ}
        className="text-primary hover:text-primary/80 hover:bg-primary/10 h-11 px-4 rounded-xl"
      >
        <IconPlus className="size-5 mr-2" />
        Add FAQ
      </Button>
    </div>
  );
};

export default Faq;
