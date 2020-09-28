import { createEvent } from "@testing-library/react";

const Strings = {
  form: {
    invalidEmailError: "ایمیل نامعتبر است",
    register: "ثبت نام",
    login: "ورود",
    emptyError: "این فیلد نمیتواند خالی باشد",
    connectionError:
      "مشکلی پیش آمده. اتصال خود به اینترنت را چک و دوباره امتحان نمایید",
  },
  signup: {
    signupTitle: "ثبت نام",
    namePlaceholder: "نام",
    familyNamePlaceholder: "نام خانوادگی",
    emailPlaceholder: "ایمیل",
    passwordPlaceholder: "رمز عبور",
    duplicatedEmailError:
      "این آدرس ایمیل قبلا توسط فرد دیگری ثبت شده است. از ایمیل دیگری برای ثبت نام استفاده نمایید.",
    haveAccount: " حساب کاربری دارید؟ ",
    comein: "وارد شوید",
  },
  login: {
    loginTitle: "وارد شوید",
    emailPlaceholder: "ایمیل",
    passwordPlaceholder: "رمز عبور",
    notHaveAccount: " حساب کاربری ندارید؟ ",
    signup: "ثبت نام کنید",
    wrongUserOrPassError: "نام کاربری و یا رمز عبور اشتباه است",
  },
  alerts: {
    confirmationTitle: "تایید ایمیل",
    signupNewUserConfirmation: `حساب کاربری شما با موفقیت ایجاد شد.
        یک ایمیل حاوی لینک فعالسازی برای شما فرستاده شد، لطفا صندوق پیام خود را چک کنید،
         چنانچه پیام در آنجا نبود حتما پوشه spam خود را نیز چک فرمایید.`,
    loginUserNotConfirmed: `حساب کاربری شما با این آدرس ایمیل موجود است. اما لازم است قبل از ورود به حسابتان، آدرس ایمیل خود را تایید کنید.
         یک ایمیل حاوی لینک فعالسازی برای شما فرستاده شد، لطفا صندوق پیام خود را چک کنید، چنانچه پیام در آنجا نبود حتما پوشه spam خود را نیز چک فرمایید.`,
  },
  storage: {
    profile: "profile",
  },
  navigationItems: {
    title: {
      mainPage: "صفحه اصلی",
      loginSignup: "ورود/ثبت نام",
      about: "درباره پایه",
      help: "راهنما",
      profile: "پروفایل",
      dashboard: "داشبورد",
      myEvents: "ایونت های من",
      createEvent: "ایجاد ایونت",
      currentEvents: "ایونت های جاری",
      completedEvents: "ایونت های به پایان رسیده",
      othersEvents: "ایونت های سایرین",
    },
    path: {
      mainPage: "/",
      loginSignup: "/login",
      about: "/about",
      help: "/help",
      profile: "/profile",
      dashboard: "/dashboard",
      //myEvents : '/',
      createEvent: "/createEvent",
      currentEvents: "/currentEvents",
      completedEvents: "/completedEvents",
      othersEvents: "/events",
    },
  },
 notNavigationalPaths : {
  alert : '/alert',
 },
  tooltip: {
    default: "اضافه کردن",
    createEvent: "ایجاد ایونت",
  },
};

export { Strings };
