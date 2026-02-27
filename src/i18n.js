import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      // Navbar & General
      home: "Home",
      products: "Products",
      about: "About",
      contact: "Contact",
      login: "Login",
      register: "Register",
      logout: "Logout",
      cart: "Cart",
      hi: "Hi",
      all: "All",
      name : "Name",
      message : "Message",
      Your_message : "Your message",
      Your_name : "Your name",
      Your_email : "Your email",
      women_clothing: "Women's Clothing",
      men_clothing: "Men's Clothing",
      jewelery: "Jewelery",
      electronics: "Electronics",
      upload_img: "Upload a profile picture (optional)",
      new_here : "Don’t have an account?",

      // Checkout & Cart
      checkout_title: "Checkout",
      cart_empty: "Your cart is empty",
      continue_shopping: "Continue Shopping",
      order_summary: "Order Summary",
      items_count: "Products",
      shipping: "Shipping",
      total_amount: "Total amount",
      billing_address: "Billing address",
      first_name: "First name",
      last_name: "Last name",
      email_label: "Email",
      address_label: "Address",
      country: "Country",
      state_label: "State",
      zip: "Zip",
      payment: "Payment",
      card_name: "Name on card",
      card_number: "Credit card number",
      expiration: "Expiration",
      cvv: "CVV",
      complete_purchase: "Complete Purchase",
      order_placed_msg: "Order Placed Successfully! Thank you for shopping. 🛍️",
      buy_now: "Buy Now",
      login_title: "Login",
      register_title: "Create Account",
      // Home & About
      hero_title: "New Season Arrivals",
      hero_description:
        "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
      about_title: "About Us",
      about_desc:
        "Welcome to React Ecommerce, your premier destination for fashion, jewelry, and electronics...",
        go_to_cart: "Go to Cart",
        add_to_cart: "Add to Cart",
        similar_products: "Similar Products",
        details: "Details",
        already_account: "Already have an account?",
        password: "Password",
        full_name: "Full Name",
        placeholder_name: "Enter your full name",
        placeholder_email: "Enter your email",
        placeholder_password: "Enter your password",

      // Auth & Contact
      contact_title: "Contact Us",
      msg_success: "Message sent successfully! 📩",
      reg_success: "Account created successfully! 😊",
      validation_error: "Please fill in all fields! 📝",
    },
  },
  ar: {
    translation: {
      // Navbar & General
      home: "الرئيسية",
      products: "المنتجات",
      about: "من نحن",
      contact: "اتصل بنا",
      login: "دخول",
      register: "تسجيل",
      logout: "خروج",
      cart: "السلة",
      hi: "أهلاً",
      all: "الكل",
      name : "الاسم",
      message : "الرسالة",
      Your_message : "رسالتك",
      Your_name : "اسمك",
      Your_email : "بريدك الإلكتروني",
      women_clothing: "ملابس نساء",
      men_clothing: "ملابس رجال",
      jewelery: "جوائز",
      electronics: "الكترونيات",
      upload_img: "قم بتحميل صورة شخصية (اختياري)",
      new_here : "ليس لديك حساب؟",


      // Checkout & Cart
      checkout_title: "إتمام الشراء",
      cart_empty: "عربة التسوق فارغة",
      continue_shopping: "استمرار التسوق",
      order_summary: "ملخص الطلب",
      items_count: "المنتجات",
      shipping: "الشحن",
      total_amount: "إجمالي المبلغ",
      billing_address: "عنوان الفاتورة",
      first_name: "الاسم الأول",
      last_name: "اسم العائلة",
      email_label: "البريد الإلكتروني",
      address_label: "العنوان",
      country: "الدولة",
      state_label: "المحافظة",
      zip: "الرمز البريدي",
      payment: "الدفع",
      card_name: "الاسم على البطاقة",
      card_number: "رقم البطاقة الائتمانية",
      expiration: "تاريخ الانتهاء",
      cvv: "كود الأمان (CVV)",
      complete_purchase: "إتمام عملية الشراء",
      order_placed_msg: "تم تقديم الطلب بنجاح! شكراً لتسوقك معنا. 🛍️",
      buy_now: "اشتري الآن",
      login_title: "تسجيل الدخول",
      register_title: "إنشاء حساب",

      // Home & About
      hero_title: "وصلات الموسم الجديد",
      hero_description:
        "هذه لوحة عرض واسعة تحتوي على نص داعم في الأسفل كمقدمة طبيعية لمحتوى إضافي.",
      about_title: "من نحن",
      about_desc:
        "مرحبًا بك في React Ecommerce، وجهتك الأولى للأزياء والمجوهرات والإلكترونيات...",
        go_to_cart: "اذهب إلى السلة",
        add_to_cart: "أضف إلى السلة",
        similar_products: "منتجات مشابهة",
        details: "التفاصيل",
        already_account: "هل لديك حساب بالفعل؟",
        password: "كلمة المرور",
        full_name: "الاسم الكامل",
        placeholder_name: "أدخل اسمك الكامل",
        placeholder_email: "أدخل بريدك الإلكتروني",
        placeholder_password: "أدخل كلمة المرور",

      // Auth & Contact
      contact_title: "اتصل بنا",
      msg_success: "تم إرسال الرسالة بنجاح! 📩",
      reg_success: "تم إنشاء الحساب بنجاح! 😊",
      validation_error: "يرجى ملء جميع الحقول! 📝",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.dir = i18n.dir(lng);
  document.documentElement.lang = lng;
});

export default i18n;
