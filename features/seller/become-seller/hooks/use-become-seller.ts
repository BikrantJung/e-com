import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { axios } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { BecomeSellerDto } from '@/features/complete-setup/types';
import { useSession } from 'next-auth/react';
async function becomeSeller(becomeSellerInput: BecomeSellerDto) {
  return await axios.post('seller/become-seller/', {
    ...becomeSellerInput,
  });
}

function useBecomeSeller({ callbackUrl }: { callbackUrl?: string }) {
  const router = useRouter();
  const { update } = useSession();
  const mutation = useMutation((data: BecomeSellerDto) => becomeSeller(data), {
    onError(error: AxiosError) {
      console.log('ERROR HAHA', error);
      if (error.response?.data) {
        const responseData = error.response.data as {
          message: string[] | string;
        };
        if (Array.isArray(responseData.message)) {
          responseData.message.map((item) => toast.error(item));
        } else {
          toast.error(responseData.message);
        }
        if (error.response.status === 404) router.replace('/login');
      }
    },
    onSuccess() {
      update();
      toast.success('Upgraded to merchant account');
      if (!!callbackUrl) {
        router.replace(callbackUrl);
      } else {
        router.replace('/');
      }
    },
  });
  return mutation;
}

export { useBecomeSeller };
