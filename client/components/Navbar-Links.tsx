'use client'

import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { setCodeforcesVerified } from "@/redux/reducers/user";
import { ThemeToggle } from "./theme-toggle";
import { ProfileDropdown } from "./profile-dropdown";

export default function NavbarLinks() {
  const dispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleUnlink = () => {
    dispatch(setCodeforcesVerified(false));
    setOpenConfirm(false);
  };

  return (
    <>
      <div className="hidden md:flex items-center space-x-6">
        <Link href="/home" className="text-sm font-medium hover:text-primary transition-colors">
          Dashboard
        </Link>
        <Link href="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors">
          Leaderboard
        </Link>
        <Link href="/practice" className="text-sm font-medium hover:text-primary transition-colors">
          Practice
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-4">
         <Button
          variant="outline"
          className="text-sm"
          onClick={() => setOpenConfirm(true)}
        >
          Unlink CF
        </Button>
        <ThemeToggle />
        <ProfileDropdown />
      </div>

      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent>
          <DialogHeader className="py-3">
            <DialogTitle>Are you sure you want to unlink Codeforces?</DialogTitle>
          </DialogHeader>
          <DialogFooter className="gap-2 p-1">
            <Button variant="secondary" onClick={() => setOpenConfirm(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleUnlink}>
              Unlink
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
