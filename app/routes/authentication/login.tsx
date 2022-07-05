import { Form, Link, useLoaderData, useTransition } from "@remix-run/react";
import Input from "~/components/Input";
import Checkbox from "~/components/Checkbox";
import Button from "~/components/Button";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { json, redirect } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import axios from "axios";
import { commitSession, getSession } from "~/sessions";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const transition = useTransition();
  const { error } = useLoaderData();
  return (
    <Form method="post">
      <div className="mt-9 flex flex-col justify-center items-center w-max mx-auto">
        {error ? (
          <div className="bg-red-600 text-white w-full h-16 flex justify-center items-center font-black">
            {error}
          </div>
        ) : null}
        <Input
          type="email"
          label="Email"
          name="email"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.currentTarget.value)
          }
        />
        <Input
          type="password"
          label="Password"
          name="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.currentTarget.value)
          }
        />
        <div className="flex flex-row justify-between mt-10 w-full">
          <Checkbox label="Remember Me" />

          <Link
            className="text-unalink-blue"
            to="/authentication/reset"
            prefetch="intent"
          >
            Forgot Password ?
          </Link>
        </div>
        <Button
          label={
            transition.state == "submitting" ? (
              <span className="loader"></span>
            ) : (
              "Login"
            )
          }
          disabled={
            password != "" &&
            username
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              )
              ? false
              : true
          }
          type="submit"
        />
      </div>
    </Form>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();
  const email: string = form.get("email")?.toString() ?? "";
  const password: string = form.get("password")?.toString() ?? "";
  const { status, data } = await axios
    .post("https://track.unalink.net/api/session", null, {
      params: {
        email,
        password,
      },
    })
    .then(async (data) => {
      return {
        status: 200,
        data: data.data,
      };
    })
    .catch((r) => {
      return { status: 401, data: {} };
    });
  if (status == 401) {
    session.flash("error", "Username/Password is wrong");
    return redirect("/authentication/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } else {
    session.set("email", email);
    session.set("password", password);
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const data = {
    error: session.get("error"),
  };
  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
