import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddress, useSigner, ConnectWallet } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { formatFormData } from "@/utils/formatJson";

const schema = yup.object().shape({
  title: yup.string().required("案件タイトルは必須です"),
  fixedFee: yup.string().required("固定報酬は必須です"),
  jobDetails: yup.string().required("仕事の詳細は必須です"),
  specialNotes: yup.string(),
  deliveryDate: yup.string().required("納品完了日は必須です"),
  applicationDeadline: yup.string().required("応募期限は必須です"),
});

type FormData = yup.InferType<typeof schema>;

export default function DealCollectionForm() {
  const address = useAddress();
  const signer = useSigner();
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // eslint-disable-next-line consistent-return
  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("/api/deal/create", {
        data,
        signer,
      });
      return response.data;
    } catch (error: any) {
      console.error(`Error creating NFT collection: ${error.toString()}`);
      return null;
    }
  };

  return (
    <Box w={{ base: "md" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl
            id="title"
            isInvalid={!!formState.errors.title}
            isRequired
          >
            <FormLabel>案件タイトル</FormLabel>
            <Input type="text" {...register("title")} />
            {formState.errors.title && <p>{formState.errors.title.message}</p>}
          </FormControl>
          <FormControl
            id="fixedFee"
            isInvalid={!!formState.errors.fixedFee}
            isRequired
          >
            <FormLabel>固定報酬</FormLabel>
            <Input type="number" {...register("fixedFee")} />
            {formState.errors.fixedFee && (
              <p>{formState.errors.fixedFee.message}</p>
            )}
          </FormControl>
          <FormControl
            id="jobDetails"
            isInvalid={!!formState.errors.jobDetails}
            isRequired
          >
            <FormLabel>仕事の詳細</FormLabel>
            <Textarea {...register("jobDetails")} />
            {formState.errors.jobDetails && (
              <p>{formState.errors.jobDetails.message}</p>
            )}
          </FormControl>
          <FormControl
            id="specialNotes"
            isInvalid={!!formState.errors.specialNotes}
          >
            <FormLabel>特記事項</FormLabel>
            <Textarea {...register("specialNotes")} />
            {formState.errors.specialNotes && (
              <p>{formState.errors.specialNotes.message}</p>
            )}
          </FormControl>
          <FormControl
            id="applicationDeadline"
            isInvalid={!!formState.errors.applicationDeadline}
            isRequired
          >
            <FormLabel>応募期限</FormLabel>
            <Input type="date" {...register("applicationDeadline")} />
            {formState.errors.applicationDeadline && (
              <p>{formState.errors.applicationDeadline.message}</p>
            )}
          </FormControl>
          <FormControl
            id="deliveryDate"
            isInvalid={!!formState.errors.deliveryDate}
            isRequired
          >
            <FormLabel>納品完了日</FormLabel>
            <Input type="date" {...register("deliveryDate")} />
            {formState.errors.deliveryDate && (
              <p>{formState.errors.deliveryDate.message}</p>
            )}
          </FormControl>
          {!address ? (
            <ConnectWallet />
          ) : (
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={formState.isSubmitting}
            >
              送信
            </Button>
          )}
        </VStack>
      </form>
    </Box>
  );
}
