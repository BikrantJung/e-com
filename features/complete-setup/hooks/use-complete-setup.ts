import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { axios } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { CompleteSetupI } from '../types';
import { useSession } from 'next-auth/react';
async function completeSetup(completeSetupInput: CompleteSetupI) {
  return await axios.post('auth/complete-setup/', {
    ...completeSetupInput,
  });
}

function useCompleteSetup(completeSetupInput: CompleteSetupI) {
  const router = useRouter();
  const { update } = useSession();
  return useMutation(() => completeSetup(completeSetupInput), {
    onError(error: AxiosError) {
      if (error.response?.data) {
        const responseData = error.response.data as {
          message: string[] | string;
        };
        if (Array.isArray(responseData.message)) {
          responseData.message.map((item) => toast.error(item));
        } else {
          toast.error(responseData.message);
        }
      }
    },
    onSuccess() {
      update();
      toast.success('Setup Complete');
      router.replace('/');
    },
  });
}

export { useCompleteSetup };
