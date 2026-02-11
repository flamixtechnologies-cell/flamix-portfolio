"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Calendar,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Section } from "@/components/ui";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@flamixtech.com",
    href: "mailto:hello@flamixtech.com",
    description: "We'll respond within 24 hours",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    description: "Mon-Fri, 9am-6pm PST",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "San Francisco, CA",
    href: "#",
    description: "123 Tech Street, 94105",
  },
];

const benefits = [
  "Free initial consultation",
  "Custom solution design",
  "Dedicated project manager",
  "Transparent pricing",
];

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", company: "", budget: "", message: "" });
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  return (
    <Section id="contact" className="relative overflow-hidden pb-32 md:pb-40">
      {/* Header */}
      <SectionHeading
        title="Get in Touch"
        description="Ready to start your next project? Let's build something amazing together. We'd love to hear from you."
        number="06"
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Contact Info Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Cards */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="space-y-4"
          >
            {contactInfo.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                variants={fadeInUp}
                className="flex items-start gap-4 p-5 rounded-2xl bg-background border border-foreground/10 hover:border-foreground/20 transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-foreground/60" />
                </div>
                <div>
                  <p className="text-xs text-foreground/50 uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  <p className="font-semibold text-lg text-foreground">
                    {item.value}
                  </p>
                  <p className="text-sm text-foreground/50 mt-1">{item.description}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Schedule CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 rounded-2xl bg-background border border-foreground/10 hover:border-foreground/20 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-foreground/60" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-foreground">Schedule a Call</h4>
                <p className="text-sm text-foreground/60">Free 30-min consultation</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4">
              <Clock className="w-4 h-4" />
              <span>Available Mon-Fri, 9am-6pm PST</span>
            </div>

            <Button
              className="w-full bg-foreground text-background rounded-full py-6 font-semibold hover:opacity-90 transition-opacity duration-300"
              endContent={<ArrowRight className="w-4 h-4" />}
            >
              Book a Meeting
            </Button>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-5 rounded-2xl bg-background border border-foreground/10 hover:border-foreground/20 transition-all duration-300"
          >
            <h4 className="font-semibold mb-4 text-foreground">What you&apos;ll get:</h4>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-foreground/60 shrink-0" />
                  <span className="text-sm text-foreground/70">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Contact Form Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-3"
        >
          <div className="p-8 md:p-10 rounded-2xl bg-background border border-foreground/10 hover:border-foreground/20 transition-all duration-300">
            <div className="relative">
              {/* Success Message */}
              {isSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-green-500 font-medium">
                    Message sent successfully! We&apos;ll be in touch soon.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    name="name"
                    label="Full Name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    variant="bordered"
                    size="lg"
                    classNames={{
                      input: "text-foreground",
                      inputWrapper: "border-primary/20 bg-background/50",
                      label: "text-foreground/60",
                    }}
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    label="Email Address"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    variant="bordered"
                    size="lg"
                    classNames={{
                      input: "text-foreground",
                      inputWrapper: "border-primary/20 bg-background/50",
                      label: "text-foreground/60",
                    }}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    name="company"
                    label="Company Name"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={handleChange}
                    variant="bordered"
                    size="lg"
                    classNames={{
                      input: "text-foreground",
                      inputWrapper: "border-primary/20 bg-background/50",
                      label: "text-foreground/60",
                    }}
                  />
                  <Input
                    name="budget"
                    label="Project Budget"
                    placeholder="$10k - $50k"
                    value={formData.budget}
                    onChange={handleChange}
                    variant="bordered"
                    size="lg"
                    classNames={{
                      input: "text-foreground",
                      inputWrapper: "border-primary/20 bg-background/50",
                      label: "text-foreground/60",
                    }}
                  />
                </div>

                <Textarea
                  name="message"
                  label="Project Details"
                  placeholder="Tell us about your project, goals, and timeline..."
                  value={formData.message}
                  onChange={handleChange}
                  variant="bordered"
                  size="lg"
                  minRows={5}
                  classNames={{
                    input: "text-foreground",
                    inputWrapper: "border-primary/20 bg-background/50",
                    label: "text-foreground/60",
                  }}
                  required
                />

                <Button
                  type="submit"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full bg-foreground text-background rounded-full py-7 text-lg font-semibold hover:opacity-90 transition-opacity duration-300"
                  endContent={!isSubmitting && <Send className="w-5 h-5" />}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                <p className="text-center text-sm text-foreground/50">
                  By submitting, you agree to our{" "}
                  <a href="#" className="text-primary">
                    Privacy Policy
                  </a>
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
