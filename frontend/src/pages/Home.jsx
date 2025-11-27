import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import anuncioService from "../api/anuncioService";
import {
  Box,
  Container,
  Typography,
  Card,
  Button,
  useTheme,
  Paper,
  Fade,
  Skeleton,
  alpha,
  Chip,
  Grid
} from "@mui/material";
import {
  HomeWork as HomeIcon,
  People as PeopleIcon,
  Campaign as CampaignIcon,
  CheckCircle as ActiveIcon,
  PauseCircle as PauseIcon,
  Cancel as FinalizedIcon,
  ArrowForward as ArrowForwardIcon,
  TrendingUp as TrendingIcon,
  Add as AddIcon
} from "@mui/icons-material";

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [summary, setSummary] = useState({
    activos: 0,
    pausados: 0,
    finalizados: 0,
    total: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await anuncioService.getAll();
      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.content)
          ? res.data.content
          : [];

      const activos = data.filter((a) => a.estado === "ACTIVO").length;
      const pausados = data.filter((a) => a.estado === "PAUSADO").length;
      const finalizados = data.filter((a) => a.estado === "FINALIZADO").length;

      setSummary({
        activos,
        pausados,
        finalizados,
        total: data.length
      });
    } catch (err) {
      console.error("Error fetching summary:", err);
      setError("No se pudo cargar el resumen de anuncios");
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, count, icon, color, delay = 0 }) => (
    <Fade in={fadeIn} timeout={800} style={{ transitionDelay: `${delay}ms` }}>
      <Card
        elevation={0}
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          p: 3,
          borderRadius: 3,
          border: `1px solid ${alpha(theme.palette[color].main, 0.1)}`,
          background: `linear-gradient(135deg, ${alpha(theme.palette[color].light, 0.1)} 0%, ${alpha(theme.palette[color].main, 0.05)} 100%)`,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: `0 12px 24px ${alpha(theme.palette[color].main, 0.2)}`,
            border: `1px solid ${alpha(theme.palette[color].main, 0.3)}`,
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: `linear-gradient(90deg, ${theme.palette[color].main}, ${theme.palette[color].light})`,
          }
        }}
      >
        <Box
          sx={{
            mr: 3,
            p: 2,
            borderRadius: 3,
            bgcolor: alpha(theme.palette[color].main, 0.1),
            color: `${color}.main`,
            display: "flex",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "rotate(10deg) scale(1.1)"
            }
          }}
        >
          {icon}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h3"
            fontWeight="800"
            color={`${color}.main`}
            sx={{
              mb: 0.5,
              fontFamily: 'monospace'
            }}
          >
            {count}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight="500">
            {title}
          </Typography>
        </Box>
      </Card>
    </Fade>
  );

  const QuickAccessCard = ({ title, description, icon, path, color, delay = 0 }) => (
    <Fade in={fadeIn} timeout={800} style={{ transitionDelay: `${delay}ms` }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: `1px solid ${theme.palette.divider}`,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.12)}`,
            border: `1px solid ${theme.palette.primary.main}`,
            "& .access-icon": {
              transform: "scale(1.1) rotate(5deg)",
              color: theme.palette.primary.main
            },
            "& .arrow-icon": {
              transform: "translateX(8px)"
            }
          }
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Box
            className="access-icon"
            sx={{
              transition: "all 0.3s",
              color: "text.secondary",
              mr: 2
            }}
          >
            {React.cloneElement(icon, { sx: { fontSize: 48 } })}
          </Box>
          <Typography variant="h5" fontWeight="700">
            {title}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, flexGrow: 1, lineHeight: 1.7 }}
        >
          {description}
        </Typography>
        <Button
          variant="outlined"
          size="large"
          endIcon={<ArrowForwardIcon className="arrow-icon" sx={{ transition: "transform 0.3s" }} />}
          onClick={() => navigate(path)}
          sx={{
            borderRadius: 2,
            borderWidth: 2,
            fontWeight: 600,
            "&:hover": {
              borderWidth: 2
            }
          }}
        >
          Ir a {title}
        </Button>
      </Paper>
    </Fade>
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          color: "primary.contrastText",
          py: { xs: 6, md: 10 },
          mb: 8,
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            zIndex: 0
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: "-50%",
            right: "-10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: alpha(theme.palette.common.white, 0.05),
            zIndex: 0
          }
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <Fade in={fadeIn} timeout={1000}>
            <Box>
              <Chip
                label="Sistema de Gestión"
                sx={{
                  mb: 3,
                  bgcolor: alpha(theme.palette.common.white, 0.2),
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  px: 2
                }}
              />
              <Typography
                variant="h2"
                component="h1"
                fontWeight="900"
                gutterBottom
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  letterSpacing: "-0.02em"
                }}
              >
                Sistema Inmobiliario
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 5,
                  opacity: 0.95,
                  maxWidth: "800px",
                  mx: "auto",
                  fontWeight: 400,
                  fontSize: { xs: "1.1rem", md: "1.3rem" }
                }}
              >
                Gestión integral de propiedades, dueños y anuncios de forma simple y eficiente
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<AddIcon />}
                  onClick={() => navigate("/anuncios/nuevo")}
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    fontWeight: "700",
                    fontSize: "1rem",
                    boxShadow: `0 8px 24px ${alpha(theme.palette.secondary.main, 0.4)}`,
                    textTransform: "none",
                    "&:hover": {
                      boxShadow: `0 12px 32px ${alpha(theme.palette.secondary.main, 0.5)}`,
                    }
                  }}
                >
                  Crear Anuncio
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  startIcon={<CampaignIcon />}
                  onClick={() => navigate("/anuncios")}
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    fontWeight: "700",
                    fontSize: "1rem",
                    borderWidth: 2,
                    textTransform: "none",
                    bgcolor: alpha(theme.palette.common.white, 0.1),
                    "&:hover": {
                      borderWidth: 2,
                      bgcolor: alpha(theme.palette.common.white, 0.2),
                    }
                  }}
                >
                  Ver Anuncios
                </Button>
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Stats Section */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4, px: 1 }}>
            <TrendingIcon sx={{ mr: 1, color: "primary.main", fontSize: 32 }} />
            <Typography variant="h4" fontWeight="700">
              Resumen de Actividad
            </Typography>
          </Box>

          {loading ? (
            <Grid container spacing={3}>
              {[1, 2, 3].map((i) => (
                <Grid size={{ xs: 12, sm: 4 }} key={i}>
                  <Skeleton variant="rounded" height={120} sx={{ borderRadius: 3 }} />
                </Grid>
              ))}
            </Grid>
          ) : error ? (
            <Fade in={true}>
              <Paper
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.error.light}`,
                  bgcolor: alpha(theme.palette.error.main, 0.05)
                }}
              >
                <Typography color="error" variant="h6" gutterBottom>
                  {error}
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={fetchSummary}
                  sx={{ mt: 2 }}
                >
                  Reintentar
                </Button>
              </Paper>
            </Fade>
          ) : (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <StatCard
                  title="Anuncios Activos"
                  count={summary.activos}
                  icon={<ActiveIcon sx={{ fontSize: 32 }} />}
                  color="success"
                  delay={0}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <StatCard
                  title="Anuncios Pausados"
                  count={summary.pausados}
                  icon={<PauseIcon sx={{ fontSize: 32 }} />}
                  color="warning"
                  delay={100}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <StatCard
                  title="Anuncios Finalizados"
                  count={summary.finalizados}
                  icon={<FinalizedIcon sx={{ fontSize: 32 }} />}
                  color="error"
                  delay={200}
                />
              </Grid>
            </Grid>
          )}
        </Box>

        {/* Quick Access Section */}
        <Box sx={{ mb: 4, px: 1 }}>
          <Typography variant="h4" fontWeight="700" gutterBottom>
            Acceso Rápido
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Navega a las secciones principales del sistema
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <QuickAccessCard
              title="Propiedades"
              description="Registra nuevas propiedades, edita sus características y asocia dueños de manera intuitiva."
              icon={<HomeIcon />}
              path="/propiedades"
              delay={0}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <QuickAccessCard
              title="Dueños"
              description="Administra la base de datos completa de propietarios, tanto personas físicas como jurídicas."
              icon={<PeopleIcon />}
              path="/duenos"
              delay={100}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <QuickAccessCard
              title="Anuncios"
              description="Publica, pausa o finaliza anuncios para las propiedades registradas en el sistema."
              icon={<CampaignIcon />}
              path="/anuncios"
              delay={200}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
