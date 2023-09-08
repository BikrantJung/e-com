'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLogo from '@/components/ui/logo';
import { useForm } from '@/hooks/useForm';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { imageExtensions } from './image-extensions';
import { Toaster, toast } from 'sonner';
import { useBecomeSeller } from '@/features/seller/become-seller/hooks/use-become-seller';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { IconLoader2 } from '@tabler/icons-react';
function BecomeSeller() {
  const { data: session, status } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useSearchParams();
  const callbackUrl = router.get('callbackUrl');
  const [imageUploading, setImageUploading] = useState(false);
  const [step, setStep] = useState(1);
  const { formValues, handleChange } = useForm(() => {}, {
    storeName: '',
    storeLocation: '',
    profileImage: '',
    contactNumber: '',
    businessEmail: '',
    whatsappNumber: '',
  });
  const [fileUploadData, setFileUploadData] = useState(new FormData());
  const { mutate, isLoading } = useBecomeSeller({
    callbackUrl: `${callbackUrl}`,
  });
  function handleProfileImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const filetype = file.type.split('/')?.pop();
      if (!imageExtensions.includes(filetype || '')) {
        toast.error('Invalid file format', {});
        if (inputRef.current) {
          inputRef.current.value = '';
        }
        return;
      }
      fileUploadData.append('file', file);
      fileUploadData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_UPLOAD_PRESET as string,
      );
      fileUploadData.append(
        'cloud_name',
        process.env.NEXT_PUBLIC_CLOUD_NAME as string,
      );

      setFileUploadData(fileUploadData);
      console.log(fileUploadData, 'File uploadData');
    }
  }
  async function imageUpload() {
    let uploadingToast;
    setImageUploading(true);
    if (fileUploadData.has('file')) {
      try {
        uploadingToast = toast.loading('Uploading image...');
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/image/upload`,
          {
            method: 'POST',
            body: fileUploadData,
          },
        );
        const fetchData = await response.json();
        return fetchData.secure_url;
      } catch (error) {
        const e = error as Error;
        toast.error(e.message);
      } finally {
        setImageUploading(false);
        toast.dismiss(uploadingToast);
        toast.success('Image uploaded');
      }
    }
  }

  async function createStore() {
    let creatingStoreToast;
    try {
      const imageUrl = await imageUpload();
      creatingStoreToast = toast.loading('Upgrading account.');
      console.log('Image URL from cloudinary', imageUrl);
      mutate({
        ...formValues,
        profileImage: imageUrl,
      });
      toast.dismiss(creatingStoreToast);
    } catch (error) {
      console.log('Error');
    }
  }
  return (
    <>
      {status === 'loading' ? (
        <div className="min-h-screen flex items-center justify-center">
          <AppLogo />
        </div>
      ) : (
        <>
          <Toaster richColors />
          <div className="lg:grid-cols-3 lg:grid flex items-center justify-center min-h-screen gap-4">
            <div className="lg:flex hidden items-center justify-end min-h-screen">
              <div className="grid grid-cols-10 gap-2 items-center justify-center">
                <div className="col-span-2">
                  <StepNumber currentStep={step} number={1} />
                </div>
                <Text
                  currentStep={step}
                  position={1}
                  text={`Business Information`}
                />
                <VerticalLine currentStep={step} position={1} />
                <div className="col-span-2">
                  <StepNumber currentStep={step} number={2} />
                </div>
                <Text
                  currentStep={step}
                  position={2}
                  text={`Contact Details`}
                />
                <VerticalLine currentStep={step} position={2} />
                <div className="col-span-2">
                  <StepNumber currentStep={step} number={3} />
                </div>
                <Text
                  currentStep={step}
                  position={3}
                  text={`Bank Details (Coming Soon...)`}
                />
              </div>
            </div>
            <div className="flex items-center max-w-md justify-center min-h-screen">
              <div className="flex flex-col gap-4 items-center justify-center">
                <AppLogo />
                <AnimatePresence>
                  <motion.form className="border bg-card rounded flex flex-col gap-4 p-4 px-8">
                    <div className="flex flex-col gap-2">
                      <h3 className="scroll-m-12 text-2xl font-semibold tracking-tight">
                        Start selling your products
                      </h3>
                      <p className="text-sm max-w-[20rem] px-4 py-4 bg-secondary rounded">
                        You need to create a merchant account before start
                        selling your products.
                      </p>
                    </div>
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          key={1}
                          className="flex flex-col gap-4"
                          initial={{ opacity: 0, x: '50%' }}
                          animate={{ opacity: 1, x: '0%' }}
                          exit={{ opacity: 0, x: '-50%' }}
                          transition={{ duration: 0.1 }}
                        >
                          <div className="flex flex-col gap-2">
                            <Label
                              htmlFor="storeName"
                              className="text-sm font-normal"
                            >
                              Store name{' '}
                              <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              value={formValues.storeName}
                              id="storeName"
                              name="storeName"
                              onChange={handleChange}
                              placeholder="Your store name..."
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label
                              htmlFor="storeLocation"
                              className="text-sm font-normal"
                            >
                              Location{' '}
                              <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              value={formValues.storeLocation}
                              id="storeLocation"
                              name="storeLocation"
                              onChange={handleChange}
                              placeholder="Your store location..."
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label
                              htmlFor="profile-image"
                              className="text-sm font-normal"
                            >
                              Profile Image
                            </Label>
                            <Input
                              id="profile-image"
                              name="profileImage"
                              type="file"
                              multiple
                              onChange={(e) => handleProfileImage(e)}
                            />
                          </div>
                        </motion.div>
                      )}
                      {step === 2 && (
                        <motion.div
                          key={2}
                          className="flex flex-col gap-4"
                          initial={{ opacity: 0, x: '50%' }}
                          animate={{ opacity: 1, x: '0%' }}
                          exit={{ opacity: 0, x: '-50%' }}
                          transition={{ duration: 0.1 }}
                        >
                          <div className="flex flex-col gap-2">
                            <Label
                              htmlFor="contactNumber"
                              className="text-sm font-normal"
                            >
                              Contact Number{' '}
                              <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              value={formValues.contactNumber}
                              id="contactNumber"
                              name="contactNumber"
                              onChange={handleChange}
                              placeholder="Your store name..."
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label
                              htmlFor="businessEmail"
                              className="text-sm font-normal"
                            >
                              Business Email{' '}
                              <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              value={formValues.businessEmail}
                              id="businessEmail"
                              name="businessEmail"
                              onChange={handleChange}
                              placeholder="Your business email..."
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label
                              htmlFor="whatsappNumber"
                              className="text-sm font-normal"
                            >
                              Whatsapp
                            </Label>
                            <Input
                              value={formValues.whatsappNumber}
                              id="whatsappNumber"
                              name="whatsappNumber"
                              onChange={handleChange}
                              placeholder="+977 9800000000"
                            />
                          </div>
                        </motion.div>
                      )}
                      {step === 3 && (
                        <motion.div
                          key={3}
                          className="flex flex-col gap-4"
                          initial={{ opacity: 0, x: '50%' }}
                          animate={{ opacity: 1, x: '0%' }}
                          exit={{ opacity: 0, x: '-50%' }}
                          transition={{ duration: 0.1 }}
                        >
                          <p>Bank Details Coming Soon....</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex items-center justify-end gap-4 mt-4">
                      <Button
                        type="button"
                        disabled={step < 2}
                        onClick={() => setStep(step < 2 ? step : step - 1)}
                      >
                        Prev
                      </Button>

                      {step === 3 ? (
                        <div>
                          <Button
                            disabled={imageUploading || isLoading}
                            type="button"
                            onClick={createStore}
                          >
                            {imageUploading ||
                              (isLoading && (
                                <IconLoader2 className="icon mr-4 animate-spin" />
                              ))}
                            Continue
                          </Button>
                        </div>
                      ) : (
                        <Button
                          type="button"
                          disabled={step >= 3}
                          onClick={() => setStep(step >= 3 ? step : step + 1)}
                        >
                          Next
                        </Button>
                      )}
                    </div>
                  </motion.form>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function StepNumber({
  currentStep,
  number,
}: {
  currentStep: number;
  number: number;
}) {
  const status =
    currentStep === number
      ? 'active'
      : currentStep < number
      ? 'inactive'
      : 'completed';
  return (
    <motion.div
      animate={status}
      className={`border-2 h-8 w-8 flex items-center justify-center rounded-full`}
      variants={{
        inactive: {
          borderColor: '#6b7280',
          color: '#6b7280',
        },
        active: {
          borderColor: '#000',
          backgroundColor: '#fff',
          color: '#000',
        },
        completed: {
          backgroundColor: '#000',
          borderColor: '#000',
          color: '#fff',
        },
      }}
      transition={{ duration: 0.3 }}
    >
      {currentStep === number || currentStep < number ? (
        number
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              delay: 0.3,
              type: 'tween',
              ease: 'easeOut',
              duration: 0.3,
            }}
            d="M5 12l5 5l10 -10"
          ></motion.path>
        </svg>
      )}
    </motion.div>
  );
}
function VerticalLine({
  currentStep,
  position,
}: {
  currentStep: number;
  position: number;
}) {
  const status = currentStep > position ? 'completed' : 'inactive';
  console.log('LINE STATUS', status);
  return (
    <div className="col-span-10 ml-4 w-[1px] h-20 bg-gray-500 relative rounded-full">
      <motion.div
        transition={{ duration: 0.3 }}
        animate={{
          height: status === 'completed' ? '80px' : '0',
        }}
        className="absolute top-0 w-full bg-black rounded-full"
      ></motion.div>
    </div>
  );
}

function Text({
  currentStep,
  position,
  text,
}: {
  currentStep: number;
  position: number;
  text: string;
}) {
  const status =
    currentStep === position
      ? 'active'
      : currentStep < position
      ? 'inactive'
      : 'completed';
  return (
    <motion.p
      transition={{ duration: 0.3 }}
      animate={status}
      variants={{
        active: {
          color: '#000',
        },
        inactive: {
          color: '#6b7280',
        },
      }}
      className="col-span-8 font-medium"
    >
      {text}
    </motion.p>
  );
}

export default BecomeSeller;
