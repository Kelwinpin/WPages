"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Eye, Plus } from "lucide-react";
import getAllDocuments, { FirestoreDocument } from "@/firebase/getAllDocuments";
import addData, { updateData } from "@/firebase/addData";
import deleteDocument from "@/firebase/deleteDocument";
import { ILandingPage } from "@/tools/interfaces/ILandingPage";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function AdminPage() {
    const [landingPages, setLandingPages] = useState<FirestoreDocument[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState<FirestoreDocument | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
    const [newPageSlug, setNewPageSlug] = useState("");
    const [newPageTitle, setNewPageTitle] = useState("");
    const { toast } = useToast();

    // Fetch all landing pages
    const fetchLandingPages = async () => {
        setLoading(true);
        try {
            const pages = await getAllDocuments();
            setLandingPages(pages);
        } catch (error) {
            console.error("Error fetching landing pages:", error);
            toast({
                title: "Erro",
                description: "Não foi possível carregar as landing pages",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLandingPages();
    }, []);

    // Delete a landing page
    const handleDelete = async (id: string) => {
        try {
            await deleteDocument("landing_pages", id);
            toast({
                title: "Sucesso",
                description: "Landing page excluída com sucesso",
            });
            fetchLandingPages();
        } catch (error) {
            console.error("Error deleting landing page:", error);
            toast({
                title: "Erro",
                description: "Não foi possível excluir a landing page",
                variant: "destructive",
            });
        }
    };

    // Update a landing page
    const handleUpdate = async (id: string, data: Partial<ILandingPage>) => {
        try {
            await updateData("landing_pages", id, data);
            toast({
                title: "Sucesso",
                description: "Landing page atualizada com sucesso",
            });
            fetchLandingPages();
            setIsEditDialogOpen(false);
        } catch (error) {
            console.error("Error updating landing page:", error);
            toast({
                title: "Erro",
                description: "Não foi possível atualizar a landing page",
                variant: "destructive",
            });
        }
    };

    // Create a new landing page
    const handleCreate = async () => {
        if (!newPageSlug || !newPageTitle) {
            toast({
                title: "Erro",
                description: "Preencha todos os campos obrigatórios",
                variant: "destructive",
            });
            return;
        }

        try {
            const newPage: ILandingPage = {
                title: newPageTitle,
                links: [
                    { href: "#features", label: "Recursos" },
                    { href: "#testimonials", label: "Depoimentos" },
                    { href: "#pricing", label: "Preços" },
                    { href: "#contact", label: "Contato" },
                ],
                footer: {
                    links: [
                        { href: "/privacy", label: "Política de Privacidade" },
                        { href: "/terms", label: "Termos de Serviço" },
                        { href: "/contact", label: "Contato" },
                    ],
                },
            };

            await addData("landing_pages", newPageSlug, newPage);
            toast({
                title: "Sucesso",
                description: "Landing page criada com sucesso",
            });
            fetchLandingPages();
            setIsNewDialogOpen(false);
            setNewPageSlug("");
            setNewPageTitle("");
        } catch (error) {
            console.error("Error creating landing page:", error);
            toast({
                title: "Erro",
                description: "Não foi possível criar a landing page",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Administração de Landing Pages</h1>
                <Button onClick={() => setIsNewDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Nova Landing Page
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Landing Pages</CardTitle>
                        <CardDescription>
                            Gerencie todas as suas landing pages em um só lugar.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Título</TableHead>
                                    <TableHead>Links</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {landingPages.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                            Nenhuma landing page encontrada. Crie uma nova para começar.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    landingPages.map((page) => (
                                        <TableRow key={page.id}>
                                            <TableCell className="font-medium">{page.id}</TableCell>
                                            <TableCell>{page.title}</TableCell>
                                            <TableCell>{page.links?.length || 0} links</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/${page.id}`} target="_blank">
                                                        <Button variant="outline" size="icon">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => {
                                                            setCurrentPage(page);
                                                            setIsEditDialogOpen(true);
                                                        }}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="outline" size="icon">
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Excluir Landing Page</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Tem certeza que deseja excluir a landing page "{page.title}"? Esta ação não pode ser desfeita.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete(page.id)}>
                                                                    Excluir
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Editar Landing Page</DialogTitle>
                        <DialogDescription>
                            Faça alterações na sua landing page. Clique em salvar quando terminar.
                        </DialogDescription>
                    </DialogHeader>

                    {currentPage && (
                        <Tabs defaultValue="basic" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
                                <TabsTrigger value="links">Links de Navegação</TabsTrigger>
                                <TabsTrigger value="footer">Rodapé</TabsTrigger>
                            </TabsList>

                            <TabsContent value="basic" className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Título</Label>
                                    <Input
                                        id="title"
                                        defaultValue={currentPage.title}
                                        onChange={(e) => {
                                            setCurrentPage({
                                                ...currentPage,
                                                title: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="links" className="py-4">
                                <div className="space-y-4">
                                    <Label>Links de Navegação</Label>
                                    {currentPage.links?.map((link: { href: string; label: string }, index: number) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex-1">
                                                <Label htmlFor={`link-label-${index}`}>Texto</Label>
                                                <Input
                                                    id={`link-label-${index}`}
                                                    defaultValue={link.label}
                                                    onChange={(e) => {
                                                        const updatedLinks = [...(currentPage.links || [])];
                                                        updatedLinks[index] = {
                                                            ...updatedLinks[index],
                                                            label: e.target.value,
                                                        };
                                                        setCurrentPage({
                                                            ...currentPage,
                                                            links: updatedLinks,
                                                        });
                                                    }}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <Label htmlFor={`link-href-${index}`}>URL</Label>
                                                <Input
                                                    id={`link-href-${index}`}
                                                    defaultValue={link.href}
                                                    onChange={(e) => {
                                                        const updatedLinks = [...(currentPage.links || [])];
                                                        updatedLinks[index] = {
                                                            ...updatedLinks[index],
                                                            href: e.target.value,
                                                        };
                                                        setCurrentPage({
                                                            ...currentPage,
                                                            links: updatedLinks,
                                                        });
                                                    }}
                                                />
                                            </div>
                                            <div className="flex items-end">
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => {
                                                        const updatedLinks = [...(currentPage.links || [])];
                                                        updatedLinks.splice(index, 1);
                                                        setCurrentPage({
                                                            ...currentPage,
                                                            links: updatedLinks,
                                                        });
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            const updatedLinks = [...(currentPage.links || [])];
                                            updatedLinks.push({ href: "#", label: "Novo Link" });
                                            setCurrentPage({
                                                ...currentPage,
                                                links: updatedLinks,
                                            });
                                        }}
                                    >
                                        Adicionar Link
                                    </Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="footer" className="py-4">
                                <div className="space-y-4">
                                    <Label>Links do Rodapé</Label>
                                    {currentPage.footer?.links.map((link: { href: string; label: string }, index: number) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex-1">
                                                <Label htmlFor={`footer-label-${index}`}>Texto</Label>
                                                <Input
                                                    id={`footer-label-${index}`}
                                                    defaultValue={link.label}
                                                    onChange={(e) => {
                                                        const updatedLinks = [...(currentPage.footer?.links || [])];
                                                        updatedLinks[index] = {
                                                            ...updatedLinks[index],
                                                            label: e.target.value,
                                                        };
                                                        setCurrentPage({
                                                            ...currentPage,
                                                            footer: {
                                                                ...currentPage.footer,
                                                                links: updatedLinks,
                                                            },
                                                        });
                                                    }}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <Label htmlFor={`footer-href-${index}`}>URL</Label>
                                                <Input
                                                    id={`footer-href-${index}`}
                                                    defaultValue={link.href}
                                                    onChange={(e) => {
                                                        const updatedLinks = [...(currentPage.footer?.links || [])];
                                                        updatedLinks[index] = {
                                                            ...updatedLinks[index],
                                                            href: e.target.value,
                                                        };
                                                        setCurrentPage({
                                                            ...currentPage,
                                                            footer: {
                                                                ...currentPage.footer,
                                                                links: updatedLinks,
                                                            },
                                                        });
                                                    }}
                                                />
                                            </div>
                                            <div className="flex items-end">
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => {
                                                        const updatedLinks = [...(currentPage.footer?.links || [])];
                                                        updatedLinks.splice(index, 1);
                                                        setCurrentPage({
                                                            ...currentPage,
                                                            footer: {
                                                                ...currentPage.footer,
                                                                links: updatedLinks,
                                                            },
                                                        });
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            const updatedLinks = [...(currentPage.footer?.links || [])];
                                            updatedLinks.push({ href: "/", label: "Novo Link" });
                                            setCurrentPage({
                                                ...currentPage,
                                                footer: {
                                                    ...currentPage.footer,
                                                    links: updatedLinks,
                                                },
                                            });
                                        }}
                                    >
                                        Adicionar Link
                                    </Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={() => handleUpdate(currentPage?.id || "", currentPage as unknown as Partial<ILandingPage>)}>
                            Salvar Alterações
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* New Landing Page Dialog */}
            <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nova Landing Page</DialogTitle>
                        <DialogDescription>
                            Crie uma nova landing page. Você poderá personalizar mais detalhes depois.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="new-slug">Slug (URL)</Label>
                            <Input
                                id="new-slug"
                                placeholder="minha-landing-page"
                                value={newPageSlug}
                                onChange={(e) => setNewPageSlug(e.target.value)}
                            />
                            <p className="text-sm text-muted-foreground">
                                Este será o endereço da sua landing page: /{newPageSlug || "slug"}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="new-title">Título</Label>
                            <Input
                                id="new-title"
                                placeholder="Minha Landing Page"
                                value={newPageTitle}
                                onChange={(e) => setNewPageTitle(e.target.value)}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsNewDialogOpen(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleCreate}>Criar Landing Page</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
