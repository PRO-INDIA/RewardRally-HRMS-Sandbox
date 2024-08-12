import React, { useEffect } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { createUser } from "@stagetheproindia/react-rewardrally";

interface UserFormData {
  userId: string;
  userName: string;
  application?: any;
}

const CreateUserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>();

  const onSubmit = async (data: any) => {
    let user: UserFormData = {
      userId: data?.userId,
      userName: data.userName,
      application: [data.application],
    };
    try {
    } catch (error) {
      console.error("Error creating user:", error);
    }
    function dummyPromise() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("Promise resolved!");
        }, 2000);
      });
    }

    dummyPromise().then(async (value) => {
      let response = await createUser(user);
      console.log("response", response);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create-user-form">
      <div>
        <label>User ID:</label>
        <input
          type="text"
          {...register("userId", { required: "User ID is required" })}
        />
        {errors.userId && (
          <p>{(errors.userId as { message: string }).message}</p>
        )}
      </div>

      <div>
        <label>Username:</label>
        <input
          type="text"
          {...register("userName", { required: "Username is required" })}
        />
        {errors.userName && (
          <p>{(errors.userName as { message: string }).message}</p>
        )}
      </div>

      <div>
        <label>Application:</label>
        <input type="text" {...register("application")} />
      </div>

      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUserForm;
