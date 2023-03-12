import { Button } from "@/components/atoms/Button";
import InternalLink from "@/components/atoms/InternalLink";
import PageHeader from "@/components/header/PageHeader";
import PageLayout from "@/components/layouts/PageLayout";
import { NextPage } from "next";
import React from "react";

const ErrorPage: NextPage = () => {
  return (
    <PageLayout>
      <PageHeader title="Stránka nenalezena" />
      <div className="flex flex-col gap-5">
        <p className="text-h4">
          Zkuste se podívejte na aktuální nabídku produktů
        </p>
        <InternalLink removeClassNames href="/produkty">
          <Button>Zpět na nabídku</Button>
        </InternalLink>
      </div>
    </PageLayout>
  );
};

export default ErrorPage;
