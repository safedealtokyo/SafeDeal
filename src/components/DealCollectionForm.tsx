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
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";

type FormData = {
  fixedFee: string;
  jobDetails: string;
  specialNotes: string;
  postingDate: string;
  deliveryDate: string;
  applicationDeadline: string;
};

const schema = yup.object().shape({
  fixedFee: yup.string().required("固定報酬は必須です"),
  jobDetails: yup.string().required("仕事の詳細は必須です"),
  specialNotes: yup.string(),
  postingDate: yup.string().required("掲載日は必須です"),
  deliveryDate: yup.string().required("納品完了日は必須です"),
  applicationDeadline: yup.string().required("応募期限は必須です"),
});

export default function CustomForm() {
  const { register, handleSubmit, formState, setValue } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // setValue<FormData>("postingDate", "");
    console.log(data);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
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
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={formState.isSubmitting}
          >
            送信
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
