import "dotenv/config";
import { pool } from "./client.js";

const DEMO_SITES = [
  {
    slug: "demo-perfume",
    business_name: "Aura Luxe Perfumery",
    business_type: "retail",
    tagline: "Handcrafted fragrances for every mood",
    phone: "+1 (555) 234-5678",
    email: "hello@auraluxe.com",
    address: "12 Fragrance Lane, New York, NY 10001",
    template: "bold",
    colors: { primary: "#2C1654", secondary: "#C9A84C", accent: "#E8C4A0", background: "#0D0A12", text: "#F5F0E8" },
    fonts: { heading: "Playfair Display", body: "Lato" },
    sections: [
      {
        type: "hero",
        title: "Hero",
        content: {
          heading: "Discover Your Signature Scent",
          subheading: "Handcrafted luxury fragrances that tell your story. Each bottle is a work of art, each scent a journey.",
          ctaText: "Shop Collection",
          ctaLink: "#services",
          backgroundImage: "https://images.unsplash.com/photo-1542736536-f9aea26ad27e?w=1600&q=80",
        },
        sort_order: 0,
      },
      {
        type: "about",
        title: "Our Story",
        content: {
          title: "Crafted With Passion Since 1998",
          body: "Aura Luxe was born from a lifelong obsession with the art of fragrance. Our master perfumers source the rarest ingredients from Morocco, Grasse, and the Arabian Peninsula.\n\nEvery scent in our collection is a testament to the belief that fragrance is the most intimate form of self-expression. We create not just perfumes, but memories.",
          image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80",
          imagePosition: "right",
        },
        sort_order: 1,
      },
      {
        type: "services",
        title: "Collections",
        content: {
          items: [
            { id: "p1", name: "Midnight Oud", description: "A rich, smoky blend of aged oud wood, amber, and black rose. The scent of mystery and sophistication.", price: "$185" },
            { id: "p2", name: "White Jasmine", description: "Fresh, floral, and luminous. Sun-kissed jasmine petals with a soft sandalwood base.", price: "$145" },
            { id: "p3", name: "Velvet Iris", description: "Powdery violet and iris root wrapped in warm musk. Timeless and deeply elegant.", price: "$165" },
            { id: "p4", name: "Gold Saffron", description: "Rare saffron and honey on a bed of warm cedarwood. Bold, seductive, unforgettable.", price: "$220" },
          ],
        },
        sort_order: 2,
      },
      {
        type: "gallery",
        title: "Gallery",
        content: {
          images: [
            { id: "g1", url: "https://images.unsplash.com/photo-1619994121345-b61cd610c5a6?w=600&q=80", caption: "Midnight Oud" },
            { id: "g2", url: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=600&q=80", caption: "Our Atelier" },
            { id: "g3", url: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&q=80", caption: "White Jasmine" },
            { id: "g4", url: "https://images.unsplash.com/photo-1610461888750-10bfc601b4a6?w=600&q=80", caption: "Gift Sets" },
            { id: "g5", url: "https://images.unsplash.com/photo-1544161513-0179fe746fd5?w=600&q=80", caption: "Gold Saffron" },
            { id: "g6", url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80", caption: "Limited Edition" },
          ],
          columns: 3,
        },
        sort_order: 3,
      },
      {
        type: "testimonials",
        title: "Reviews",
        content: {
          items: [
            { id: "t1", name: "Isabella M.", text: "Midnight Oud is the most captivating scent I've ever worn. I receive compliments everywhere I go. Worth every penny.", rating: 5, role: "Verified Buyer" },
            { id: "t2", name: "Sophie R.", text: "The packaging alone is worthy of display. But the fragrance — White Jasmine — lasts all day and evolves beautifully.", rating: 5, role: "Loyal Customer Since 2020" },
            { id: "t3", name: "Priya K.", text: "I've tried luxury perfumes from all the major houses. Aura Luxe beats them all. Gold Saffron is pure magic.", rating: 5, role: "Fragrance Collector" },
          ],
        },
        sort_order: 4,
      },
      {
        type: "contact",
        title: "Contact",
        content: {
          heading: "Visit Our Atelier",
          subheading: "Book a private fragrance consultation and discover your signature scent in person.",
          recipientEmail: "hello@auraluxe.com",
          showPhone: true,
          showAddress: true,
          showMap: false,
          fields: ["name", "email", "phone", "message"],
        },
        sort_order: 5,
      },
    ],
  },
  {
    slug: "demo-gym",
    business_name: "Iron Forge Fitness",
    business_type: "gym",
    tagline: "Transform your body, transform your life",
    phone: "+1 (555) 345-6789",
    email: "train@ironforge.com",
    address: "88 Strength Ave, Los Angeles, CA 90001",
    template: "modern",
    colors: { primary: "#C0392B", secondary: "#E74C3C", accent: "#F39C12", background: "#FFFFFF", text: "#1A1A1A" },
    fonts: { heading: "Montserrat", body: "Open Sans" },
    sections: [
      {
        type: "hero",
        title: "Hero",
        content: {
          heading: "Forge Your Best Self",
          subheading: "World-class equipment, expert coaches, and a community that pushes you further than you ever thought possible.",
          ctaText: "Start Free Trial",
          ctaLink: "#contact",
          backgroundImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80",
        },
        sort_order: 0,
      },
      {
        type: "about",
        title: "About",
        content: {
          title: "More Than a Gym — It's a Movement",
          body: "Iron Forge Fitness was founded by former Olympic athletes who believed every person deserves access to elite-level training.\n\nWith 45,000 sq ft of cutting-edge equipment, 30+ weekly classes, and coaches who have trained champions — we give you everything you need to become the best version of yourself.",
          image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
          imagePosition: "left",
        },
        sort_order: 1,
      },
      {
        type: "services",
        title: "Classes",
        content: {
          items: [
            { id: "c1", name: "HIIT Training", description: "Burn up to 800 calories per session with our signature high-intensity interval training. For all fitness levels.", price: "Included" },
            { id: "c2", name: "Strength & Power", description: "Build serious muscle with periodized programming designed by strength & conditioning coaches.", price: "Included" },
            { id: "c3", name: "Yoga & Mobility", description: "Recover smarter. Our yoga classes improve flexibility, reduce injury risk, and sharpen mental focus.", price: "Included" },
            { id: "c4", name: "Personal Training", description: "1-on-1 coaching tailored to your exact goals. Fastest path to results, guaranteed.", price: "From $80/session" },
          ],
        },
        sort_order: 2,
      },
      {
        type: "gallery",
        title: "Our Facility",
        content: {
          images: [
            { id: "g1", url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80", caption: "Main Floor" },
            { id: "g2", url: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80", caption: "Strength Zone" },
            { id: "g3", url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80", caption: "HIIT Studio" },
            { id: "g4", url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80", caption: "Recovery Area" },
          ],
          columns: 2,
        },
        sort_order: 3,
      },
      {
        type: "testimonials",
        title: "Transformations",
        content: {
          items: [
            { id: "t1", name: "Marcus J.", text: "I lost 40 lbs in 6 months and put on 15 lbs of muscle. The coaches at Iron Forge completely changed how I think about fitness.", rating: 5, role: "Member since 2023" },
            { id: "t2", name: "Aisha T.", text: "As a busy mom of three, I only have 45 minutes a day. The HIIT classes are the most efficient workouts I've ever done.", rating: 5, role: "Member since 2024" },
            { id: "t3", name: "Ryan C.", text: "I've been to gyms all over LA. Nothing compares to the equipment, the coaches, or the energy here.", rating: 5, role: "Member since 2022" },
          ],
        },
        sort_order: 4,
      },
      {
        type: "contact",
        title: "Contact",
        content: {
          heading: "Start Your Journey Today",
          subheading: "Book your free trial session. No commitment, no pressure — just results.",
          recipientEmail: "train@ironforge.com",
          showPhone: true,
          showAddress: true,
          showMap: false,
          fields: ["name", "email", "phone", "message"],
        },
        sort_order: 5,
      },
    ],
  },
  {
    slug: "demo-cleaning",
    business_name: "Sparkle Pro Cleaning",
    business_type: "cleaning",
    tagline: "Spotless homes, happy families",
    phone: "+1 (555) 456-7890",
    email: "book@sparklepro.com",
    address: "55 Clean St, Chicago, IL 60601",
    template: "classic",
    colors: { primary: "#0369A1", secondary: "#0EA5E9", accent: "#10B981", background: "#F8FDFF", text: "#082F49" },
    fonts: { heading: "Sora", body: "Figtree" },
    sections: [
      {
        type: "hero",
        title: "Hero",
        content: {
          heading: "A Cleaner Home, A Happier Life",
          subheading: "Professional, insured, and background-checked cleaners who treat your home like their own. Serving Chicago since 2015.",
          ctaText: "Get Free Quote",
          ctaLink: "#contact",
          backgroundImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
        },
        sort_order: 0,
      },
      {
        type: "about",
        title: "About",
        content: {
          title: "Chicago's Most Trusted Cleaning Service",
          body: "Sparkle Pro was founded on one simple belief: your home should be your sanctuary. With over 5,000 happy clients across Chicago, we've built our reputation on consistency, trust, and detail.\n\nEvery cleaner on our team is background-checked, insured, and trained to our strict standards. We use eco-friendly products that are safe for kids, pets, and the planet.",
          image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
          imagePosition: "right",
        },
        sort_order: 1,
      },
      {
        type: "services",
        title: "Services",
        content: {
          items: [
            { id: "s1", name: "Standard Clean", description: "Regular maintenance cleaning. Kitchen, bathrooms, bedrooms, living areas. Perfect for weekly or bi-weekly bookings.", price: "From $120" },
            { id: "s2", name: "Deep Clean", description: "Full top-to-bottom scrub including baseboards, inside appliances, window sills, and all the places you can't normally reach.", price: "From $250" },
            { id: "s3", name: "Move In/Out Clean", description: "Get your full deposit back. We handle every inch of the property to meet even the strictest landlord standards.", price: "From $320" },
            { id: "s4", name: "Office Cleaning", description: "Keep your workspace professional and hygienic. After-hours service available to minimize disruption.", price: "Custom quote" },
          ],
        },
        sort_order: 2,
      },
      {
        type: "gallery",
        title: "Our Work",
        content: {
          images: [
            { id: "g1", url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", caption: "Kitchen Deep Clean" },
            { id: "g2", url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80", caption: "Bathroom Sparkle" },
            { id: "g3", url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80", caption: "Living Room" },
            { id: "g4", url: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80", caption: "Bedroom Refresh" },
          ],
          columns: 2,
        },
        sort_order: 3,
      },
      {
        type: "testimonials",
        title: "Happy Clients",
        content: {
          items: [
            { id: "t1", name: "Jennifer L.", text: "Sparkle Pro has been cleaning my home for 2 years. I've never had to ask them to redo anything. They are thorough, reliable, and genuinely care.", rating: 5, role: "Regular Client" },
            { id: "t2", name: "David K.", text: "Used them for a move-out clean and got my full $2,400 deposit back. The landlord was shocked at how clean it was.", rating: 5, role: "One-time Client" },
            { id: "t3", name: "Maria S.", text: "We have two dogs and a toddler. The team uses products that are completely safe and the house smells amazing after every visit.", rating: 5, role: "Weekly Client" },
          ],
        },
        sort_order: 4,
      },
      {
        type: "contact",
        title: "Contact",
        content: {
          heading: "Book Your Clean Today",
          subheading: "Get a free instant quote. Most bookings confirmed within 24 hours.",
          recipientEmail: "book@sparklepro.com",
          showPhone: true,
          showAddress: false,
          showMap: false,
          fields: ["name", "email", "phone", "message"],
        },
        sort_order: 5,
      },
    ],
  },
];

async function seed() {
  console.log("Seeding demo sites with rich content...");

  let demoUserId: number;
  const demoUser = await pool.query("SELECT id FROM users WHERE email = $1", ["demo@forge.app"]);
  if (demoUser.rows.length > 0) {
    demoUserId = demoUser.rows[0].id;
  } else {
    const newUser = await pool.query(
      "INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id",
      ["demo@forge.app", "not-a-real-hash", "Forge Demo"]
    );
    demoUserId = newUser.rows[0].id;
  }

  for (const demo of DEMO_SITES) {
    // Delete existing demo site to re-seed with new data
    await pool.query("DELETE FROM sites WHERE slug = $1", [demo.slug]);

    const site = await pool.query(
      `INSERT INTO sites (owner_id, slug, business_name, business_type, tagline, phone, email, address, template, colors, fonts, is_published, is_demo)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, true, true) RETURNING *`,
      [
        demoUserId,
        demo.slug,
        demo.business_name,
        demo.business_type,
        demo.tagline,
        demo.phone,
        demo.email,
        demo.address,
        demo.template,
        JSON.stringify(demo.colors),
        JSON.stringify(demo.fonts),
      ]
    );

    const siteId = site.rows[0].id;

    for (const section of demo.sections) {
      await pool.query(
        `INSERT INTO site_sections (site_id, type, title, content, sort_order) VALUES ($1, $2, $3, $4, $5)`,
        [siteId, section.type, section.title, JSON.stringify(section.content), section.sort_order]
      );
    }

    console.log(`  ✓ Seeded ${demo.slug} with ${demo.sections.length} sections`);
  }

  console.log("Done!");
  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
