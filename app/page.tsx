"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import Link from "next/link"
import { MenuIcon, Phone, Mail, CheckCircle2, Award, Sparkles, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const sections = [
  { id: "home", name: "Home" },
  { id: "services", name: "Services" },
  { id: "about", name: "About Us" },
  { id: "standout", name: "Why Choose Us" },
  { id: "contact", name: "Get Quote" },
]

const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

const AnimatedSection = ({
  children,
  id,
  className,
}: { children: React.ReactNode; id: string; className?: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInVariants}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export default function WildrosePaintersLandingPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Add form submission logic here
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md shadow-sm px-4 lg:px-8 h-20 flex items-center justify-between border-b border-muted">
        <Link
          href="#"
          className="flex items-center gap-3 font-serif text-xl md:text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
          onClick={() => scrollToSection("home")}
        >
          <Image
            src="/logo.jpg"
            alt="Wildrose Painters Logo"
            width={64}
            height={64}
            className="h-16 w-16 object-contain rounded-full"
          />
          <span className="hidden sm:inline">WILDROSE PAINTERS</span>
        </Link>
        <nav className="hidden lg:flex gap-8 items-center">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className="text-base font-medium hover:text-secondary transition-colors relative group"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(section.id)
              }}
            >
              {section.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full" />
            </Link>
          ))}
          <Button
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-white shadow-md hover:shadow-lg transition-all"
            onClick={() => scrollToSection("contact")}
          >
            Get Free Quote
          </Button>
        </nav>
        <div className="lg:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white w-[300px]">
              <div className="flex flex-col gap-6 py-8">
                {sections.map((section) => (
                  <Link
                    key={section.id}
                    href={`#${section.id}`}
                    className="text-xl font-medium hover:text-secondary transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(section.id)
                      setIsSheetOpen(false)
                    }}
                  >
                    {section.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1 pt-20">
        {/* Hero Section with Logo and Form */}
        <AnimatedSection
          id="home"
          className="relative w-full bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Logo and Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-8 flex justify-center lg:justify-start"
                >
                  <Image
                    src="/logo.jpg"
                    alt="Wildrose Painters Logo"
                    width={400}
                    height={400}
                    className="w-80 h-80 md:w-96 md:h-96 object-cover drop-shadow-2xl hover:scale-105 transition-transform duration-300 rounded-full shadow-2xl"
                    priority
                  />
                </motion.div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white mb-6 leading-tight">
                  Quality & Budget-Friendly Painting
                </h1>
                <p className="text-lg md:text-xl text-white/95 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Professional fence, deck, and interior painting services. Summer specials available! Competitive
                  pricing with exceptional quality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-lg bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all"
                    asChild
                  >
                    <a href="tel:5875016994">
                      <Phone className="mr-2 h-5 w-5" />
                      Call (587) 501-6994
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-lg bg-white/10 backdrop-blur-sm text-white border-2 border-white hover:bg-white hover:text-primary transition-all"
                    onClick={() => scrollToSection("contact")}
                  >
                    Get Free Quote
                  </Button>
                </div>
              </motion.div>

              {/* Right: Quote Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Card className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border-0">
                  <div className="mb-6 flex justify-center">
                    <Image
                      src="/logo.jpg"
                      alt="Wildrose Painters"
                      width={140}
                      height={140}
                      className="w-32 h-32 object-cover rounded-full shadow-lg mb-4"
                    />
                  </div>
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold font-serif mb-2 text-center">Get Your Free Quote</h2>
                    <p className="text-muted-foreground text-center">
                      Fill out the form and we'll get back to you within 24 hours
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full h-12 text-base"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full h-12 text-base"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full h-12 text-base"
                        placeholder="(587) 501-6994"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-semibold mb-2">
                        Service Needed *
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full h-12 text-base px-3 rounded-md border border-input bg-background"
                      >
                        <option value="">Select a service...</option>
                        <option value="fence">Fence Painting/Staining</option>
                        <option value="deck">Deck Staining/Sealing</option>
                        <option value="interior">Interior Painting</option>
                        <option value="multiple">Multiple Services</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold mb-2">
                        Project Details *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full min-h-[100px] text-base"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-secondary hover:bg-secondary/90 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all"
                    >
                      Request Your Free Quote
                    </Button>
                  </form>
                </Card>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Services Section */}
        <AnimatedSection id="services" className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">Our Painting Services</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Wildrose Painters is up and running all summer! Get competitive pricing with exceptional quality on all
                services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  title: "Fence Painting & Staining",
                  description:
                    "Professional fence painting and staining services with summer discounts. Quality finishes that protect and beautify your outdoor space.",
                  badge: "Summer Special",
                  image: "/images/fence-staining.jpg",
                },
                {
                  title: "Deck Staining & Sealing",
                  description:
                    "Expert deck staining and sealing to protect your outdoor living area. Special summer pricing on all deck projects.",
                  badge: "Summer Special",
                  image: "/images/deck-staining.jpg",
                },
                {
                  title: "Interior Painting",
                  description:
                    "Transform your indoor spaces with professional interior painting. We can do renovating and decorating too!",
                  badge: null,
                  image: "/images/interior-painting.jpg",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8, boxShadow: "0px 20px 40px rgba(0,0,0,0.12)" }}
                  className="transition-all duration-300"
                >
                  <Card className="bg-card p-0 rounded-xl shadow-lg h-full border-2 border-muted hover:border-secondary/30 relative overflow-hidden">
                    {service.badge && (
                      <div className="absolute top-4 right-4 bg-secondary text-white px-4 py-1 rounded-full text-sm font-bold z-10">
                        {service.badge}
                      </div>
                    )}
                    <div className="relative w-full h-64 overflow-hidden">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold font-serif mb-4 text-center">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-center">{service.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-secondary/10 via-accent/10 to-secondary/10 rounded-2xl p-10 md:p-12 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Award className="h-10 w-10 text-secondary" />
                <h3 className="text-3xl font-bold font-serif">Premium Paint Products</h3>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We use only the best quality paint products from trusted brands like{" "}
                <span className="font-bold text-foreground">Sherwin Williams</span> and{" "}
                <span className="font-bold text-foreground">Dulux</span> to ensure lasting, beautiful results for every
                project.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* About Us Section */}
        <AnimatedSection id="about" className="py-20 md:py-28 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">About Wildrose Painters</h2>
                <div className="flex justify-center mb-8">
                  <Image
                    src="/logo.jpg"
                    alt="Wildrose Painters Logo"
                    width={240}
                    height={240}
                    className="w-56 h-56 object-cover rounded-full shadow-xl"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
                <div className="space-y-6 text-lg leading-relaxed">
                  <p className="text-xl font-semibold text-center text-primary">
                    Established in 2020, Wildrose Painters has been serving the Greater Edmonton Area with quality
                    painting services.
                  </p>
                  <p>
                    We're a locally-owned painting company dedicated to transforming homes and businesses with
                    professional craftsmanship. Our mission is simple: deliver exceptional quality at competitive prices
                    that fit your budget.
                  </p>
                  <p>
                    Whether you need your fence refreshed, your deck protected, or your interior spaces renovated, we
                    bring the same level of attention to detail and commitment to excellence to every project. We
                    believe quality painting shouldn't break the bank, which is why we offer budget-friendly solutions
                    without compromising on results.
                  </p>
                  <p className="font-semibold text-center text-secondary text-xl pt-4">
                    Quality is of our utmost importance. Every brush stroke matters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* How We Stand Out Section */}
        <AnimatedSection id="standout" className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">How We Stand Out</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                What makes Wildrose Painters the right choice for your painting project
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: <Sparkles className="h-8 w-8" />,
                  title: "Quality-Focused Approach",
                  description:
                    "We never compromise on quality. Every project receives meticulous attention to detail and professional craftsmanship that lasts.",
                },
                {
                  icon: <Award className="h-8 w-8" />,
                  title: "Premium Materials",
                  description:
                    "We exclusively use top-tier Sherwin Williams and Dulux paints, ensuring superior coverage, durability, and finish.",
                },
                {
                  icon: <CheckCircle2 className="h-8 w-8" />,
                  title: "Budget-Friendly Pricing",
                  description:
                    "Competitive rates that respect your budget without sacrificing quality. Get the best value for your investment.",
                },
                {
                  icon: <Clock className="h-8 w-8" />,
                  title: "Timely Completion",
                  description:
                    "We respect your time and schedule. Projects are completed efficiently without rushing the quality of our work.",
                },
                {
                  icon: <Phone className="h-8 w-8" />,
                  title: "Responsive Communication",
                  description:
                    "Quick responses to calls and texts. We're here to answer your questions and keep you informed throughout the project.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, boxShadow: "0px 15px 30px rgba(0,0,0,0.1)" }}
                  className="transition-all duration-300"
                >
                  <Card className="bg-card p-8 rounded-xl shadow-md h-full border border-muted hover:border-secondary/40">
                    <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6 text-secondary">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold font-serif mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-10 md:p-12 text-white">
                <h3 className="text-3xl font-bold font-serif mb-4">Summer Special Discounts!</h3>
                <p className="text-xl mb-6 max-w-2xl mx-auto leading-relaxed">
                  Get special summer pricing on deck and fence projects. Request your quote now for competitive rates
                  with our signature quality focus.
                </p>
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-6 shadow-xl"
                  onClick={() => scrollToSection("contact")}
                >
                  Claim Your Summer Discount
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection id="contact" className="py-20 md:py-28 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">Ready to Get Started?</h2>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Contact us today for your free quote and competitive pricing
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                  <div className="flex justify-center lg:justify-start">
                    <Image
                      src="/logo.jpg"
                      alt="Wildrose Painters"
                      width={200}
                      height={200}
                      className="w-48 h-48 object-cover rounded-full shadow-xl"
                    />
                  </div>

                  <Card className="bg-white p-6 rounded-xl shadow-lg border-2 border-secondary/20">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-7 w-7 text-secondary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-serif mb-1">Call or Text Us</h3>
                        <a href="tel:5875016994" className="text-2xl text-secondary hover:underline font-bold">
                          (587) 501-6994
                        </a>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-7 w-7 text-secondary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-serif mb-1">Visit Our Website</h3>
                        <a
                          href="https://www.wildrosepainters.ca"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xl text-secondary hover:underline font-semibold"
                        >
                          www.wildrosepainters.ca
                        </a>
                      </div>
                    </div>
                  </Card>

                  <div className="bg-gradient-to-br from-primary to-primary/90 rounded-xl p-6 text-white">
                    <h3 className="text-xl font-bold font-serif mb-3">Service Area</h3>
                    <p className="text-lg">Proudly serving the Greater Edmonton Area and surrounding communities</p>
                  </div>
                </div>

                {/* Quote Form */}
                <Card className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border-0">
                  <h3 className="text-2xl font-bold font-serif mb-6">Request Your Free Quote</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-semibold mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full h-12 text-base"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-semibold mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full h-12 text-base"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-semibold mb-2">
                        Phone Number *
                      </label>
                      <Input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full h-12 text-base"
                        placeholder="(587) 501-6994"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-service" className="block text-sm font-semibold mb-2">
                        Service Needed *
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full h-12 text-base px-3 rounded-md border border-input bg-background"
                      >
                        <option value="">Select a service...</option>
                        <option value="fence">Fence Painting/Staining</option>
                        <option value="deck">Deck Staining/Sealing</option>
                        <option value="interior">Interior Painting</option>
                        <option value="multiple">Multiple Services</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-semibold mb-2">
                        Project Details *
                      </label>
                      <Textarea
                        id="contact-message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full min-h-[120px] text-base"
                        placeholder="Tell us about your fence, deck, or interior painting project..."
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-secondary hover:bg-secondary/90 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all"
                    >
                      Get Your Free Quote Now
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/logo.jpg"
                alt="Wildrose Painters Logo"
                width={56}
                height={56}
                className="h-14 w-14 object-contain rounded-full"
              />
              <div>
                <p className="font-serif text-2xl font-bold">Wildrose Painters</p>
                <p className="text-sm text-white/80">Est. 2020</p>
              </div>
            </div>
            <p className="mb-6 text-white/90">Quality & Budget-Friendly Painting Services</p>
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <a href="tel:5875016994" className="hover:text-secondary transition-colors">
                (587) 501-6994
              </a>
              <a
                href="https://www.wildrosepainters.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                www.wildrosepainters.ca
              </a>
            </div>
            <p className="text-sm text-white/70">
              &copy; {new Date().getFullYear()} Wildrose Painters. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
