/* eslint-disable consistent-return */
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import usePush from "@/hooks/usePush";

const schema = yup.object().shape({
  title: yup.string().required("案件タイトルは必須です"),
  fixedFee: yup.string().required("固定報酬は必須です"),
  jobDetails: yup.string().required("仕事の詳細は必須です"),
  specialNotes: yup.string(),
  deliveryDate: yup.string().required("納品完了日は必須です"),
  applicationDeadline: yup.string().required("応募期限は必須です"),
  walletAddress: yup.string().required("ウォレットは必須です")
});

type FormData = yup.InferType<typeof schema>;

export default function DealCollectionForm() {
  const router = useRouter();
  const address = useAddress();
  const { pushTarget } = usePush();
  const { register, handleSubmit, reset, formState, setValue } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  const onSubmit = async (data: FormData) => {
    console.log(data);
    if (address) {
      try {
        setValue("walletAddress", address);
        const response = await axios.post("/api/deal/create", data);
        // infoToast("Deal Created");
        pushTarget("Deal Created", "Deal Created", address);
        reset();
        router.push("/");
        return response.data;
      } catch (error: any) {
        console.error(`Error creating NFT collection: ${error.toString()}`);
        return null;
      }
    }
  };

  return (
    <Box w={{ base: "80%" }} pb="60px" pt="20px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl
            id="title"
            isInvalid={!!formState.errors.title}
            isRequired
          >
            <FormLabel>Deal Title</FormLabel>
            <Input type="text" {...register("title")} />
            {formState.errors.title && <p>{formState.errors.title.message}</p>}
          </FormControl>
          <FormControl
            id="fixedFee"
            isInvalid={!!formState.errors.fixedFee}
            isRequired
          >
            <FormLabel>Reward</FormLabel>
            <Input type="number" step="0.0001" {...register("fixedFee")} />
            {formState.errors.fixedFee && (
              <p>{formState.errors.fixedFee.message}</p>
            )}
          </FormControl>
          <FormControl
            id="jobDetails"
            isInvalid={!!formState.errors.jobDetails}
            isRequired
          >
            <FormLabel>Detail</FormLabel>
            <Textarea {...register("jobDetails")} />
            {formState.errors.jobDetails && (
              <p>{formState.errors.jobDetails.message}</p>
            )}
          </FormControl>
          <FormControl
            id="specialNotes"
            isInvalid={!!formState.errors.specialNotes}
          >
            <FormLabel>Notes</FormLabel>
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
            <FormLabel>Apply Deadline</FormLabel>
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
            <FormLabel>Delivery Date</FormLabel>
            <Input type="date" {...register("deliveryDate")} />
            {formState.errors.deliveryDate && (
              <p>{formState.errors.deliveryDate.message}</p>
            )}
          </FormControl>
          <FormControl
            id="walletAddress"
          >
            <FormLabel>Your Apply Wallet Address</FormLabel>
            <Input
              type="text"
              value={address || ""}
              isReadOnly
              {...register("walletAddress")}
            />
          </FormControl>
          <Button
            width="full"
            type="submit"
            colorScheme="blue"
            isLoading={formState.isSubmitting}
          >
            Sumbit
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
