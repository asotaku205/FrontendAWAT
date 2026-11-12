import { useState, type FormEvent } from "react";
import axios from "axios";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router";
import DensoLogo from "../../assets/Denso_logo.svg";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { login } from "./api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const mocksEnabled = import.meta.env.VITE_USE_MOCKS === "true";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await login ({email,password})
      navigate("/", { replace: true });
    } catch (error) {
      if (axios.isAxiosError<{ message?: string }>(error)) {
        setErrorMessage(
          error.response?.data?.message ??
            "Không thể kết nối đến máy chủ. Vui lòng thử lại.",
        );
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#8d1018] via-[#c51d26] to-[#e6232a] px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between xl:px-20">
        <div
          aria-hidden="true"
          className="absolute -right-36 -top-32 size-[34rem] rounded-full border border-white/10"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-56 -left-40 size-[36rem] rounded-full border border-white/10"
        />

        <div className="relative z-10">
          <img
            src={DensoLogo}
            alt="DENSO"
            className="h-12 w-auto brightness-0 invert"
          />
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
            AWAT · Operations
          </p>
        </div>

        <div className="relative z-10 max-w-xl py-14">
          <p className="mb-5 text-sm font-medium text-white/75">
            Nền tảng quản lý vận hành
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
            Vận hành liền mạch.
            <br />
            Phát triển bền vững.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-white/75">
            Tập trung dữ liệu, tối ưu quy trình và kết nối đội ngũ trên cùng một
            hệ thống.
          </p>
          <div className="mt-10 flex items-center gap-3 text-sm text-white/85">
            <span className="flex size-10 items-center justify-center rounded-xl bg-white/15">
              <ShieldCheck aria-hidden="true" size={20} />
            </span>
            <span>Đăng nhập an toàn vào không gian làm việc của bạn</span>
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/55">
          © {new Date().getFullYear()} AWAT. All rights reserved.
        </p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-[420px]">
          <div className="mb-10 lg:hidden">
            <img src={DensoLogo} alt="DENSO" className="h-10 w-auto" />
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
              AWAT · Operations
            </p>
          </div>

          <div className="mb-9">
            <p className="mb-3 text-sm font-semibold text-red-700">
              Chào mừng bạn quay lại
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-gray-950">
              Đăng nhập
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Nhập thông tin tài khoản để tiếp tục vào hệ thống.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="login-email"
                className="text-sm font-medium text-gray-800"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  disabled={isSubmitting}
                  className="h-12 rounded-lg border-gray-200 bg-gray-50 pl-10 pr-3 text-sm focus-visible:border-red-600 focus-visible:ring-red-600/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="login-password"
                className="text-sm font-medium text-gray-800"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <LockKeyhole
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  disabled={isSubmitting}
                  className="h-12 rounded-lg border-gray-200 bg-gray-50 pl-10 pr-12 text-sm focus-visible:border-red-600 focus-visible:ring-red-600/20"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700/40"
                >
                  {showPassword ? (
                    <EyeOff aria-hidden="true" size={18} />
                  ) : (
                    <Eye aria-hidden="true" size={18} />
                  )}
                </button>
              </div>
            </div>

            {errorMessage && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700"
              >
                {errorMessage}
              </p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full gap-2 rounded-lg text-sm font-semibold shadow-sm shadow-red-700/15"
            >
              {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
              {!isSubmitting && <ArrowRight aria-hidden="true" size={17} />}
            </Button>
          </form>

          {mocksEnabled && (
            <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3.5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Tài khoản thử nghiệm
              </p>
              <p className="mt-2 text-sm text-gray-700">
                Email: <span className="font-medium">admin@awat.vn</span>
              </p>
              <p className="mt-1 text-sm text-gray-700">
                Mật khẩu: <span className="font-medium">awat123</span>
              </p>
            </div>
          )}

          <p className="mt-8 text-center text-xs text-gray-400">
            Bằng việc đăng nhập, bạn đồng ý với chính sách bảo mật của hệ thống.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
