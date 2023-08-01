const Yup = require ( "yup");

exports.schema = Yup.object().shape({
    fullname: Yup.string()
        .required("نام و نام خانوادگی الزامی می باشد")
        .min(4, "نام و نام خانوادگی نباید کمتر از 4 کاراکتر باشد")
        .max(100, "نام و نام خانوادگی نباید بیشتر از 255 کاراکتر باشد"),
    username: Yup.string()
        .email("ایمیل معتبر نمی باشد")
        .required("ایمیل الزامی می باشد"),
    password: Yup.string()
        .min(4, "کلمه عبور نباید کمتر از 4 کاراکتر باشد")
        .max(10, "کلمه عبور نباید بیشتر از 10 کاراکتر باشد")
        .required("کلمه عبور الزامی می باشد"),
})