import {
	AlertCircle,
	Check,
	Image as ImageIcon,
	Upload,
	X,
} from "lucide-react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

interface ImageUploadProps {
	onImageSelect?: (file: File | null) => void;
	onError?: (error: string) => void;
	maxSize?: number; // in bytes
	acceptedFormats?: string[];
	className?: string;
}

export default function ImageUpload({
	onImageSelect,
	onError,
	maxSize = 10 * 1024 * 1024, // 10MB default
	acceptedFormats = ["image/png", "image/jpeg", "image/gif"],
	className = "",
}: ImageUploadProps) {
	const { t } = useTranslation();
	const [isDragging, setIsDragging] = useState(false);
	const [preview, setPreview] = useState<string | null>(null);
	const [fileName, setFileName] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isValid, setIsValid] = useState(false);

	const maxSizeInMb = maxSize / 1024 / 1024;

	const validateAndProcessFile = useCallback(
		(file: File) => {
			setError(null);
			setIsValid(false);

			// Validate file type
			if (!acceptedFormats.includes(file.type)) {
				const errorMsg = t("components.image_upload.error_invalid_format");
				setError(errorMsg);
				onError?.(errorMsg);
				return;
			}

			// Validate file size
			if (file.size > maxSize) {
				const errorMsg = t("components.image_upload.error_too_large", {
					maxSizeInMb,
				});
				setError(errorMsg);
				onError?.(errorMsg);
				return;
			}

			// Create preview
			const reader = new FileReader();
			reader.onload = (e) => {
				setPreview(e.target?.result as string);
				setFileName(file.name);
				setIsValid(true);
				onImageSelect?.(file);
			};
			reader.readAsDataURL(file);
		},
		[acceptedFormats, maxSize, onError, onImageSelect, t, maxSizeInMb],
	);

	const handleDragEnter = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	}, []);

	const handleDragLeave = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	}, []);

	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	}, []);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
			setIsDragging(false);

			const files = e.dataTransfer.files;
			if (files.length > 0) {
				validateAndProcessFile(files[0]);
			}
		},
		[validateAndProcessFile],
	);

	const handleFileInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files;
			if (files && files.length > 0) {
				validateAndProcessFile(files[0]);
			}
		},
		[validateAndProcessFile],
	);

	const handleClear = useCallback(() => {
		setPreview(null);
		setFileName(null);
		setError(null);
		setIsValid(false);
		onImageSelect?.(null);
	}, [onImageSelect]);

	return (
		<div className={`relative ${className}`}>
			<input
				type="file"
				id="image-upload"
				accept={acceptedFormats.join(",")}
				onChange={handleFileInput}
				className="sr-only"
			/>

			{!preview ? (
				<label
					htmlFor="image-upload"
					onDragEnter={handleDragEnter}
					onDragLeave={handleDragLeave}
					onDragOver={handleDragOver}
					onDrop={handleDrop}
					className={`
						group relative block cursor-pointer overflow-hidden
						rounded-xl border-2 transition-all duration-500 ease-out
						${
							isDragging
								? "border-primary bg-surface-muted scale-[0.98] shadow-2xl"
								: error
									? "border-red-300 bg-red-50/30 hover:border-red-400"
									: "border-border-primary bg-surface-muted/30 hover:border-primary hover:bg-surface-muted"
						}
					`}
					style={{
						boxShadow: isDragging
							? "0 20px 60px -15px rgba(166, 134, 74, 0.4), inset 0 1px 3px rgba(166, 134, 74, 0.1)"
							: "inset 0 1px 2px rgba(166, 134, 74, 0.05)",
					}}
				>
					{/* Decorative corner accents */}
					<div
						className="absolute top-0 left-0 w-16 h-16 opacity-20 transition-all duration-500"
						style={{
							background:
								"linear-gradient(135deg, rgba(166, 134, 74, 0.3) 0%, transparent 70%)",
							transform: isDragging ? "scale(1.5)" : "scale(1)",
						}}
					/>
					<div
						className="absolute bottom-0 right-0 w-16 h-16 opacity-20 transition-all duration-500"
						style={{
							background:
								"linear-gradient(-45deg, rgba(166, 134, 74, 0.3) 0%, transparent 70%)",
							transform: isDragging ? "scale(1.5)" : "scale(1)",
						}}
					/>

					{/* Main content area */}
					<div className="relative px-6 py-12 flex flex-col items-center justify-center text-center space-y-4">
						{/* Icon with animated ring */}
						<div className="relative">
							<div
								className={`
								absolute inset-0 rounded-full bg-primary/10 blur-xl
								transition-all duration-700
								${isDragging ? "scale-150 opacity-100" : "scale-100 opacity-0 group-hover:opacity-60"}
							`}
							/>
							<div
								className={`
								relative rounded-2xl p-6
								transition-all duration-500 ease-out
								${
									isDragging
										? "bg-primary/20 scale-110 rotate-12"
										: "bg-surface-muted group-hover:bg-primary/10 group-hover:scale-105"
								}
							`}
								style={{
									boxShadow: isDragging
										? "0 10px 40px -10px rgba(166, 134, 74, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.1)"
										: "inset 0 1px 3px rgba(0, 0, 0, 0.05)",
								}}
							>
								{error ? (
									<AlertCircle
										className={`w-12 h-12 text-red-500 transition-transform duration-500 ${
											error ? "scale-100" : "scale-0"
										}`}
									/>
								) : isDragging ? (
									<ImageIcon
										className="w-12 h-12 text-primary transition-all duration-300"
										strokeWidth={2.5}
									/>
								) : (
									<Upload
										className="w-12 h-12 text-primary/70 group-hover:text-primary transition-all duration-300 group-hover:scale-110"
										strokeWidth={2}
									/>
								)}
							</div>
						</div>

						{/* Text content */}
						<div className="space-y-2">
							<p
								className={`text-lg font-medium transition-colors duration-300 ${
									error
										? "text-red-600"
										: isDragging
											? "text-heading"
											: "text-muted group-hover:text-heading"
								}`}
							>
								{error
									? error
									: isDragging
										? t("components.image_upload.drop_here")
										: t("components.image_upload.drag_or_click")}
							</p>
							<p className="text-sm text-subtle">
								{t("components.image_upload.supported_formats")}
							</p>
							<p className="text-xs text-faint">
								{t("components.image_upload.max_size", { maxSizeInMb })}
							</p>
						</div>

						{/* Subtle gradient overlay */}
						<div
							className="absolute inset-0 pointer-events-none rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
							style={{
								background:
									"radial-gradient(circle at 50% 0%, rgba(166, 134, 74, 0.03) 0%, transparent 70%)",
							}}
						/>
					</div>
				</label>
			) : (
				<div
					className="relative rounded-xl border-2 border-primary bg-surface overflow-hidden"
					style={{
						boxShadow:
							"0 10px 40px -10px rgba(166, 134, 74, 0.3), inset 0 1px 3px rgba(166, 134, 74, 0.1)",
					}}
				>
					{/* Success indicator */}
					{isValid && (
						<div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded-full shadow-lg animate-in fade-in slide-in-from-left-2 duration-500">
							<Check className="w-4 h-4" strokeWidth={3} />
							<span className="text-sm font-medium">
								{t("components.image_upload.success")}
							</span>
						</div>
					)}

					{/* Remove button */}
					<button
						type="button"
						onClick={handleClear}
						className="absolute top-4 right-4 z-10 p-2 rounded-full bg-surface-muted/90 backdrop-blur-sm border border-border-primary text-muted hover:text-heading hover:bg-surface-active hover:border-primary transition-all duration-300 hover:scale-110 hover:rotate-90 shadow-lg group"
						aria-label={t("components.image_upload.remove")}
					>
						<X className="w-5 h-5" strokeWidth={2.5} />
					</button>

					{/* Image preview with elegant frame */}
					<div className="relative p-6">
						<div
							className="relative rounded-lg overflow-hidden"
							style={{
								boxShadow:
									"0 4px 20px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.1)",
							}}
						>
							<img
								src={preview}
								alt={t("components.image_upload.preview_alt")}
								className="w-full h-auto max-h-96 object-contain bg-surface-muted/50"
								style={{
									imageRendering: "crisp-edges",
								}}
							/>

							{/* Decorative inner border */}
							<div
								className="absolute inset-0 pointer-events-none rounded-lg"
								style={{
									boxShadow: "inset 0 0 0 1px rgba(166, 134, 74, 0.2)",
								}}
							/>
						</div>

						{/* File name */}
						<div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted">
							<ImageIcon className="w-4 h-4 text-primary" strokeWidth={2} />
							<span className="font-medium truncate max-w-xs">{fileName}</span>
						</div>
					</div>

					{/* Decorative metallic corners */}
					<div
						className="absolute top-0 left-0 w-20 h-20 opacity-30 pointer-events-none"
						style={{
							background:
								"linear-gradient(135deg, rgba(166, 134, 74, 0.4) 0%, transparent 60%)",
						}}
					/>
					<div
						className="absolute bottom-0 right-0 w-20 h-20 opacity-30 pointer-events-none"
						style={{
							background:
								"linear-gradient(-45deg, rgba(166, 134, 74, 0.4) 0%, transparent 60%)",
						}}
					/>
				</div>
			)}
		</div>
	);
}
