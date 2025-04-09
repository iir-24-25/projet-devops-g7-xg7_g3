import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HelpCircle, Book, MessageCircle, FileText, Mail, Phone, Video } from "lucide-react"

export function HelpPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Help & Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="faq">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="faq">
                <Book className="h-4 w-4 mr-2" />
                FAQs
              </TabsTrigger>
              <TabsTrigger value="contact">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Us
              </TabsTrigger>
              <TabsTrigger value="docs">
                <FileText className="h-4 w-4 mr-2" />
                Documentation
              </TabsTrigger>
              <TabsTrigger value="tutorials">
                <Video className="h-4 w-4 mr-2" />
                Tutorials
              </TabsTrigger>
            </TabsList>

            <TabsContent value="faq" className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium mb-2">How do I reset my password?</h3>
                  <p className="text-muted-foreground">
                    To reset your password, go to the login page and click on "Forgot Password". Follow the instructions
                    sent to your email to create a new password.
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium mb-2">How do I submit an assignment?</h3>
                  <p className="text-muted-foreground">
                    Navigate to the Assignments page, find the assignment you want to submit, and click on "Submit". You
                    can upload files or enter text directly.
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium mb-2">How do I view my grades?</h3>
                  <p className="text-muted-foreground">
                    You can view your grades in the Assignments section. Click on any assignment to see detailed
                    feedback and grades.
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium mb-2">How do I enroll in a new course?</h3>
                  <p className="text-muted-foreground">
                    Go to the Courses page and click on "Browse Courses". Find the course you're interested in and click
                    "Enroll".
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Send us a message</h3>
                  <div className="space-y-2">
                    <Input placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <Input placeholder="Your Email" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Input placeholder="Subject" />
                  </div>
                  <div className="space-y-2">
                    <textarea
                      className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                  <Button>Send Message</Button>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Contact Information</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Email Us</p>
                        <p className="text-sm text-muted-foreground">support@academix.com</p>
                        <p className="text-sm text-muted-foreground">info@academix.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Call Us</p>
                        <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                        <p className="text-sm text-muted-foreground">Mon-Fri, 9AM-5PM EST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MessageCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Live Chat</p>
                        <p className="text-sm text-muted-foreground">Available 24/7</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Start Chat
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="docs" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium mb-2">Getting Started Guide</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn the basics of using the Academix platform.
                    </p>
                    <Button variant="outline" className="w-full">
                      View Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium mb-2">User Manual</h3>
                    <p className="text-sm text-muted-foreground mb-4">Comprehensive documentation for all features.</p>
                    <Button variant="outline" className="w-full">
                      View Manual
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium mb-2">API Documentation</h3>
                    <p className="text-sm text-muted-foreground mb-4">Technical documentation for developers.</p>
                    <Button variant="outline" className="w-full">
                      View API Docs
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tutorials" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                      <Video className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">Getting Started with Academix</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Learn how to navigate the dashboard and use basic features.
                    </p>
                    <Button variant="outline" size="sm">
                      Watch Tutorial
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                      <Video className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">Managing Assignments</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Learn how to create, submit, and grade assignments.
                    </p>
                    <Button variant="outline" size="sm">
                      Watch Tutorial
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                      <Video className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">Course Management</h3>
                    <p className="text-sm text-muted-foreground mb-2">Learn how to create and manage courses.</p>
                    <Button variant="outline" size="sm">
                      Watch Tutorial
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                      <Video className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">Advanced Analytics</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Learn how to use the analytics features to track progress.
                    </p>
                    <Button variant="outline" size="sm">
                      Watch Tutorial
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
