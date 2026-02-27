import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      // Navbar
      home: "Home",
      products: "Products",
      about: "About",
      contact: "Contact",
      login: "Login",
      register: "Register",
      logout: "Logout",
      cart: "Cart",
      hi: "Hi",
      all : "All",

      // Register Page
      register_title: "Register",
      full_name: "Full Name",
      placeholder_name: "Enter Your Name",
      upload_img: "Upload Profile Picture (Optional)",
      already_account: "Already have an account?",
      reg_btn: "Register",
      reg_success: "Account created successfully! Please Login to continue. 😊",
      pass_short: "Password must be at least 6 characters! 🛡️",

      // Login Page
      login_title: "Login",
      email_label: "Email address",
      password_label: "Password",
      placeholder_email: "name@example.com",
      placeholder_password: "Password",
      new_here: "New Here?",
      validation_error: "Please fill in all fields! 📝",
      welcome_back: "Welcome back",
      auth_error: "Invalid email or password! ❌",

      // About & Contact
      about_title: "About Us",
      about_desc:
        "Welcome to React Ecommerce, your premier destination for fashion jewelry and electronics. Founded in 2026 our mission is simple: to bring high-quality handpicked products directly to your doorstep with just one click. We are dedicated to providing you with the very best with a focus on dependability and a seamless shopping experience. We believe that quality shopping should be accessible to everyone everywhere. Whether you're looking for the latest tech to stay connected or trendy fashion to express your style our team is committed to delivering excellence and ensuring your satisfaction. Thank you for choosing us as your trusted shopping partner.",
      our_products: "Our Products",
      contact_title: "Contact Us",
      send_btn: "Send Message",
      msg_success: "Message sent successfully! 📩",
      men_clothing: "Men's Clothing",
      women_clothing: "Women's Clothing",
      jewelery: "Jewelery",
      electronics: "Electronics",
    },
  },
  ar: {
    translation: {
      // Navbar
      home: "الرئيسية",
      products: "المنتجات",
      about: "من نحن",
      contact: "اتصل بنا",
      login: "دخول",
      register: "تسجيل",
      logout: "خروج",
      cart: "السلة",
      hi: "أهلاً",
      all : "الكل",

      // Register Page
      register_title: "إنشاء حساب",
      full_name: "الاسم بالكامل",
      placeholder_name: "أدخل اسمك",
      upload_img: "رفع صورة شخصية (اختياري)",
      already_account: "لديك حساب بالفعل؟",
      reg_btn: "تسجيل",
      reg_success: "تم إنشاء الحساب بنجاح! سجل دخولك للمتابعة. 😊",
      pass_short: "كلمة المرور يجب أن تكون 6 أحرف على الأقل! 🛡️",

      // Login Page
      login_title: "تسجيل الدخول",
      email_label: "البريد الإلكتروني",
      password_label: "كلمة المرور",
      placeholder_email: "البريد الإلكتروني",
      placeholder_password: "كلمة المرور",
      new_here: "جديد هنا؟",
      validation_error: "يرجى ملء جميع الحقول! 📝",
      welcome_back: "مرحباً بعودتك يا",
      auth_error: "خطأ في البريد أو كلمة المرور! ❌",

      // About & Contact
      about_title: "من نحن",
      about_desc:
      "مرحبًا بكم في React Ecommerce، وجهتكم الأولى للأزياء والمجوهرات والإلكترونيات. تأسسنا في عام 2026 مهمتنا بسيطة: جلب منتجات عالية الجودة مختارة بعناية مباشرة إلى باب منزلك بنقرة واحدة فقط. نحن ملتزمون بتقديم الأفضل مع التركيز على الاعتمادية وتجربة تسوق سلسة. نؤمن أن التسوق الجيد يجب أن يكون متاحًا للجميع في كل مكان. سواء كنت تبحث عن أحدث التقنيات للبقاء على اتصال أو أزياء عصرية للتعبير عن أسلوبك، فإن فريقنا ملتزم بتقديم التميز وضمان رضاك. شكرًا لاختيارك لنا كشريك تسوق موثوق.",
      our_products: "منتجاتنا",
      contact_title: "اتصل بنا",
      send_btn: "إرسال الرسالة",
      msg_success: "تم إرسال الرسالة بنجاح! 📩",
      men_clothing: "ملابس رجالي",
      women_clothing: "ملابس حريمي",
      jewelery: "مجوهرات",
      electronics: "إلكترونيات",
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
