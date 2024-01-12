import LoginForm from "@/components/auth/login-form";
import PageHeader from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageTitle from "@/components/ui/page-title";

export default function LoginPage() {
  return (
    <>
      <PageHeader>
        <PageTitle>Login</PageTitle>
      </PageHeader>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
