import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, X, CheckCircle, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useVerifyCodeforcesHandle } from "@/hooks/api/user-hooks";
import { setCodeforcesVerified,setCodeforcesHandle } from "@/redux/reducers/user";
import { useDispatch,useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function CodeforcesVerificationCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [handle, setHandle] = useState("");
  const [countdown, setCountdown] = useState(120); // seconds
  const [verified, setVerified] = useState<boolean | null>(null);
  const { verify,loading,result }=useVerifyCodeforcesHandle();
  const timerRef = useRef<number>(0);
  const dispatch = useDispatch();
  const {UserData,isCodeforcesVerified} = useSelector((state:RootState) => state.user);
  useEffect(() => {
    if (step === 2) {
      setCountdown(120);
      timerRef.current = window.setInterval(() => {
        setCountdown((t) => {
          if (t <= 1) {
            window.clearInterval(timerRef.current);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => window.clearInterval(timerRef.current);
  }, [step]);

  const open = () => {
    setIsOpen(true);
    setStep(1);
    setVerified(null);
    setHandle("");
  };
  const close = () => {
    setIsOpen(false);
    window.clearInterval(timerRef.current);
  };

  const startVerification = () => {
    if (!handle.trim()) return;
    setStep(2);
  };

  const finishVerification = async () => {
    const resp = await verify({
      userId:UserData?._id as string,
      codeforcesId: handle,
    });
    if (resp.success) {
      dispatch(setCodeforcesHandle(handle));
      setVerified(resp.success);
      dispatch(setCodeforcesVerified(true));
      setStep(3);
    }
    else {
      setVerified(false);
      setStep(3);
      console.error("Verification failed:", result?.message || "Unknown error");
    }
  };

  const minutes = String(Math.floor(countdown / 60)).padStart(2, "0");
  const seconds = String(countdown % 60).padStart(2, "0");
  const progressPercent = ((120 - countdown) / 120) * 100;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5 text-red-500" />
            Codeforces Profile
          </CardTitle>
          <CardDescription>External platform statistics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="text-center">
            <p className="font-medium text-red-600 mb-2">
              Your Codeforces account is not verified.
            </p>
            <Button onClick={open} variant="outline" size="default">
              Link Codeforces
            </Button>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              Once you link your Codeforces handle, we’ll fetch your latest
              stats and achievements automatically.
            </p>
            <p className="mt-2">
              Keep your profile up‑to‑date to unlock all features on our
              platform!
            </p>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg">
          {step === 1 && (
            <>
              <DialogHeader>
                <DialogTitle>Connect Codeforces Handle</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Enter your Codeforces Handle"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Don’t have an account?{" "}
                  <a
                    href="https://codeforces.com/register"
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    Create now
                  </a>
                </p>
              </div>
              <DialogFooter className="pt-4">
                <Button variant="outline" onClick={close}>
                  Cancel
                </Button>
                <Button onClick={startVerification}>Next</Button>
              </DialogFooter>
            </>
          )}

          {step === 2 && (
            <>
              <DialogHeader>
                <DialogTitle>Verify Your Submission</DialogTitle>
              </DialogHeader>

              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>Time remaining to submit:</span>
                  <span className="font-mono">
                    {minutes}:{seconds}
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-[width]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <ol className="list-decimal list-inside space-y-3 text-sm">
                <li>
                  Submit a compilation error for{" "}
                  <a
                    href="https://codeforces.com/problemset/problem/1000/G"
                    className="text-blue-500 underline"
                    target="_blank"
                  >
                    Problem 1000G
                  </a>{" "}
                  using your handle ({handle}). Paste the provided snippet and
                  hit Submit.
                </li>
                <li>
                  Copy this : //Testing This should generate Compilation Error
                </li>
                <li>
                  After submission, wait for the “Compilation error” verdict on
                  the Status tab, then come back and click{" "}
                  <span className="font-semibold">Verify Now</span>.
                </li>
              </ol>

              <DialogFooter className="pt-4">
                <Button variant="outline" onClick={close}>
                  Cancel
                </Button>
                <Button disabled={countdown === 0} onClick={finishVerification}>
                  Verify Now
                </Button>
              </DialogFooter>
            </>
          )}

          {step === 3 && (
            <>
              <div className="flex justify-end">
                <button onClick={close}>
                  <X className="h-5 w-5 text-muted-foreground hover:text-red-500" />
                </button>
              </div>
              <div className="py-8 text-center">
                {verified ? (
                  <>
                    <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                    <h3 className="mt-4 text-lg font-semibold">
                      Verification Successful!
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Your handle <span className="font-medium">{handle}</span>{" "}
                      is now linked.
                    </p>
                  </>
                ) : (
                  <>
                    <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
                    <h3 className="mt-4 text-lg font-semibold">
                      Verification Failed
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      We couldn’t confirm your submission. Please try again.
                    </p>
                    <Button
                      className="mt-4"
                      onClick={() => {
                        setStep(2);
                        setVerified(null);
                      }}
                    >
                      Retry
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
