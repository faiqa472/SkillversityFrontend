"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockScholarships } from "@/lib/mock-data";
import { Plus, Users, Calendar, DollarSign } from "lucide-react";

export default function ScholarshipsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Scholarship Management</h1>
          <p className="text-muted-foreground">Create and manage scholarship programs</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Scholarship
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Scholarship</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="scholarship-title">Scholarship Title</Label>
                <Input id="scholarship-title" placeholder="e.g., Women in Tech Scholarship" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scholarship-description">Description</Label>
                <Textarea id="scholarship-description" placeholder="Scholarship description..." rows={4} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (PKR)</Label>
                  <Input id="amount" type="number" placeholder="50000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slots">Number of Slots</Label>
                  <Input id="slots" type="number" placeholder="10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input id="deadline" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="criteria">Eligibility Criteria</Label>
                <Textarea id="criteria" placeholder="List eligibility requirements..." rows={3} />
              </div>
              <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
                Create Scholarship
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Scholarships</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Currently accepting applications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recipients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <p className="text-xs text-muted-foreground">Students supported</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Disbursed</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">PKR 7.2M</div>
            <p className="text-xs text-muted-foreground">Lifetime disbursement</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Scholarship Programs</CardTitle>
          <CardDescription>Manage your scholarship offerings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockScholarships.map((scholarship) => (
                <TableRow key={scholarship.id}>
                  <TableCell className="font-medium">{scholarship.title}</TableCell>
                  <TableCell>
                    {scholarship.currency} {scholarship.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>25/50</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-4 w-4" />
                      {scholarship.applicationDeadline.toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">Active</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
          <CardDescription>Latest scholarship applications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {["Ahmed Khan", "Sara Ali", "Hassan Raza"].map((name) => (
            <div key={name} className="flex items-center justify-between border-b pb-4 last:border-0">
              <div>
                <p className="font-medium">{name}</p>
                <p className="text-sm text-muted-foreground">Applied for Tech for Pakistan Scholarship</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Review
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
