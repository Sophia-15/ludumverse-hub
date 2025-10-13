import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, Share2, Image as ImageIcon } from "lucide-react";
import { mockPosts } from "@/data/mockData";
import { toast } from "sonner";

const Community = () => {
  const [newPost, setNewPost] = useState("");
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const handleLike = (postId: string) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  const handlePost = () => {
    if (newPost.trim()) {
      toast.success("Post publicado com sucesso!");
      setNewPost("");
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="bg-gradient-hero border-b border-border/50 py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Comunidade
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Compartilhe suas experiências, conquistas e conecte-se com outros jogadores
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Create Post */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm mb-8">
            <h2 className="font-bold text-lg mb-4">Criar novo post</h2>
            <Textarea
              placeholder="Compartilhe algo com a comunidade... (máx. 500 caracteres)"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              maxLength={500}
              className="mb-3 min-h-[100px]"
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Adicionar Imagem
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {newPost.length}/500
                </span>
                <Button
                  variant="hero"
                  onClick={handlePost}
                  disabled={!newPost.trim()}
                >
                  Publicar
                </Button>
              </div>
            </div>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-6">
            {mockPosts.map((post) => {
              const isLiked = likedPosts.includes(post.id);
              
              return (
                <Card
                  key={post.id}
                  className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-border transition-smooth"
                >
                  {/* Post Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-primary" />
                        <div>
                          <p className="font-semibold">{post.userName}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(post.date).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">{post.gameName}</Badge>
                    </div>

                    <p className="text-foreground mb-4">{post.content}</p>

                    {/* Post Image */}
                    {post.image && (
                      <div className="rounded-lg overflow-hidden mb-4">
                        <img
                          src={post.image}
                          alt="Post"
                          className="w-full h-auto"
                        />
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-6 pt-4 border-t border-border/50">
                      <button
                        className={`flex items-center gap-2 transition-smooth ${
                          isLiked
                            ? 'text-red-500'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart
                          className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
                        />
                        <span className="text-sm font-medium">
                          {post.likes + (isLiked ? 1 : 0)}
                        </span>
                      </button>

                      <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth">
                        <MessageSquare className="w-5 h-5" />
                        <span className="text-sm font-medium">{post.comments}</span>
                      </button>

                      <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth ml-auto">
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm font-medium">Compartilhar</span>
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Carregar mais posts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
