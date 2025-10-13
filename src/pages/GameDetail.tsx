import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingCart, Download, Star, ThumbsUp, ThumbsDown, 
  Calendar, Users, Wrench, ArrowLeft 
} from "lucide-react";
import { mockGames, mockReviews, mockUserLibrary } from "@/data/mockData";
import { useState } from "react";
import { toast } from "sonner";

const GameDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const game = mockGames.find(g => g.slug === slug);
  const gameReviews = mockReviews.filter(r => r.gameId === game?.id);
  const isOwned = game && mockUserLibrary.includes(game.id);
  
  const [selectedImage, setSelectedImage] = useState(0);

  if (!game) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <p>Jogo não encontrado</p>
      </div>
    );
  }

  const handlePurchase = () => {
    if (game.price === 0) {
      toast.success(`${game.title} adicionado à sua biblioteca!`);
    } else {
      toast.success(`Compra de ${game.title} realizada com sucesso!`);
    }
  };

  const handleDownload = () => {
    toast.success(`Download de ${game.title} iniciado!`);
  };

  const allImages = [game.coverImage, ...game.screenshots];

  return (
    <div className="min-h-screen pt-16">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" onClick={() => navigate('/catalogo')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao catálogo
        </Button>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Media */}
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden mb-4">
              <img
                src={allImages[selectedImage]}
                alt={game.title}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {allImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg overflow-hidden cursor-pointer border-2 transition-smooth ${
                    selectedImage === idx ? 'border-primary' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img
                    src={img}
                    alt={`Screenshot ${idx + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Purchase Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-card/50 backdrop-blur-sm sticky top-20">
              <div className="mb-4">
                <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
                <p className="text-muted-foreground">por {game.developerName}</p>
              </div>

              {isOwned ? (
                <div className="space-y-3">
                  <Badge className="w-full justify-center py-2 bg-gradient-secondary">
                    Na sua biblioteca
                  </Badge>
                  <Button variant="hero" className="w-full" onClick={handleDownload}>
                    <Download className="w-5 h-5 mr-2" />
                    Baixar
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/mods')}>
                    <Wrench className="w-5 h-5 mr-2" />
                    Ver Mods
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {game.price > 0 ? (
                    <div className="text-center py-4">
                      {game.originalPrice && (
                        <p className="text-muted-foreground line-through mb-1">
                          R$ {game.originalPrice.toFixed(2)}
                        </p>
                      )}
                      <p className="text-4xl font-bold text-primary">
                        R$ {game.price.toFixed(2)}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-4xl font-bold text-secondary">Gratuito</p>
                    </div>
                  )}
                  
                  <Button variant="hero" className="w-full" onClick={handlePurchase}>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {game.price > 0 ? 'Comprar' : 'Adicionar à Biblioteca'}
                  </Button>
                </div>
              )}

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-border/50 space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <span className="font-semibold">{game.rating}</span>
                  <span className="text-muted-foreground text-sm">
                    ({game.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm">
                    Lançamento: {new Date(game.releaseDate).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-5 h-5" />
                  <span className="text-sm">{game.downloadCount.toLocaleString('pt-BR')} downloads</span>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-6 pt-6 border-t border-border/50">
                <p className="text-sm font-medium mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Details Tabs */}
      <section className="container mx-auto px-4 py-8">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="about">Sobre</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({gameReviews.length})</TabsTrigger>
            <TabsTrigger value="community">Comunidade</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-6">
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4">Sobre o jogo</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {game.description}
              </p>

              {game.isEarlyAccess && (
                <div className="bg-muted/50 border border-border/50 rounded-lg p-4 mb-6">
                  <p className="font-semibold mb-2">⚠️ Acesso Antecipado</p>
                  <p className="text-sm text-muted-foreground">
                    Este jogo está em desenvolvimento ativo. Recursos e conteúdo podem mudar.
                  </p>
                </div>
              )}

              {game.modsEnabled && (
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <p className="font-semibold mb-2">🎮 Suporte a Mods</p>
                  <p className="text-sm text-muted-foreground">
                    Este jogo tem oficina de mods ativa! Personalize sua experiência.
                  </p>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-4">
              {/* Rating Summary */}
              <Card className="p-6 bg-card/50 backdrop-blur-sm">
                <div className="flex items-start gap-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary mb-2">{game.rating}</div>
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{game.reviewCount} avaliações</p>
                  </div>
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = Math.floor(Math.random() * game.reviewCount * 0.3);
                      const percentage = (count / game.reviewCount) * 100;
                      return (
                        <div key={rating} className="flex items-center gap-2 mb-2">
                          <span className="text-sm w-12">{rating} ★</span>
                          <Progress value={percentage} className="flex-1" />
                          <span className="text-sm text-muted-foreground w-12">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>

              {/* Reviews List */}
              {gameReviews.map((review) => (
                <Card key={review.id} className="p-6 bg-card/50 backdrop-blur-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">{review.userName}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <Badge variant={review.recommended ? "default" : "destructive"}>
                      {review.recommended ? (
                        <>
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          Recomendo
                        </>
                      ) : (
                        <>
                          <ThumbsDown className="w-3 h-3 mr-1" />
                          Não recomendo
                        </>
                      )}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'fill-primary text-primary' : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-muted-foreground mb-3">{review.comment}</p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-foreground transition-smooth">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Útil ({review.helpful})</span>
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="mt-6">
            <Card className="p-6 bg-card/50 backdrop-blur-sm text-center">
              <p className="text-muted-foreground">
                Posts da comunidade serão exibidos aqui. Visite a página de{" "}
                <span
                  className="text-primary cursor-pointer hover:underline"
                  onClick={() => navigate('/comunidade')}
                >
                  Comunidade
                </span>{" "}
                para ver todas as discussões.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default GameDetail;
