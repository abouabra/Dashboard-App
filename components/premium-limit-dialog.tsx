"use client";

import { AlertCircle, Zap } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface PremiumLimitDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function PremiumLimitDialog({ open, onOpenChange }: PremiumLimitDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<div className="flex items-center gap-2">
						<AlertCircle className="h-5 w-5 text-amber-500" />
						<AlertDialogTitle>Daily View Limit Reached</AlertDialogTitle>
					</div>

					<AlertDialogDescription asChild>
						<div className="space-y-2 pt-2">
							<p>You have reached your daily limit of 50 agency details views.</p>

							<div className="flex items-center gap-2 font-medium text-foreground">
								<Zap className="h-4 w-4 text-amber-500" />
								<span>Upgrade to Premium to unlock unlimited views</span>
							</div>
						</div>
					</AlertDialogDescription>
          
				</AlertDialogHeader>
				<div className="flex gap-3 justify-end">
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction className="gap-2">
						<Zap className="h-4 w-4" />
						Upgrade Now
					</AlertDialogAction>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}
