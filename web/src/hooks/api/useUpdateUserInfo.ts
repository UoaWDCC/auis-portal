import { useMutation } from "@tanstack/react-query";
import { updateUserInfo } from "../../api/apiRequests";
import { AxiosResponse } from "axios";

export const useUpdateUserInfo = () => {
  return useMutation<
    AxiosResponse,
    Error,
    {
      name: string;
      universityId: string;
      upi: string;
      yearOfStudy: string;
      fieldOfStudy: string;
      isDomestic: string;
      institution: string;
    }
  >({
    mutationFn: ({
      name,
      universityId,
      upi,
      yearOfStudy,
      fieldOfStudy,
      isDomestic,
      institution,
    }) =>
      updateUserInfo(
        name,
        universityId,
        upi,
        yearOfStudy,
        fieldOfStudy,
        isDomestic,
        institution
      ),
  });
};
