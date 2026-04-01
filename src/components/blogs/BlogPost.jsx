import { useRef, useState, useEffect } from "react";
import {
  Box, Container,
  Grid
} from "@mui/material";
import CoverSection from "./CoverSection";
import BlogSectionHeader from "./BlogSectionHeader";
import CodeSection from "./CodeSection";
import BlogTextSection from "./BlogTextSection";
import ArchitectureDiagram from "./ArchitectureDiagram";
import MetricsTable from "./MetricsTable";
import ComparisonTable from "./ComparisionTable";
import MetricCards from "./MetricCards";
import Timeline from "./Timeline";
import LatencyHeatmap from "./LatencyHeatMap";
import BlogSidebar from "./BlogSideBar";

const blogData = {
  title: "E-Commerce Load Balancing on Kubernetes",
  subtitle:
    "A production case study on distributing traffic across microservices using Kubernetes-native load balancing, Nginx Ingress, and Prometheus observability.",
  cover:
    "https://images.unsplash.com/photo-1667372393086-9d4001d51cf1?q=80&w=2232&auto=format&fit=crop",
  tags: ["Kubernetes", "Microservices", "Load Balancing", "Spring Boot", "K6", "Prometheus"],
  github: "https://github.com/your-org/ecommerce-k8s-lb",
  readTime: "12 min read",
  date: "March 2025",
  author: {
    name: "Narayana",
    avatar: "N",
  },

  sections: [
    {
      id: "overview",
      title: "Overview",
      type: "text",
      content: `Modern e-commerce platforms face highly variable traffic — flash sales, seasonal spikes, or viral promotions can cause 10x–100x bursts within seconds. This case study explores how Kubernetes-native load balancing was used to distribute HTTP traffic across stateless microservices, eliminating single points of failure and enabling horizontal auto-scaling under load.

The platform consists of ten microservices — product-service, order-service, inventory-service, cart-service, notification-service, payment-service, user-service, review-service, search-service, and an API gateway — all deployed on a Kubernetes cluster (OrbStack/minikube locally, production-equivalent manifests). Traffic enters through an Nginx Ingress Controller, which routes to services via Kubernetes ClusterIP, and services communicate internally over gRPC and REST.

Key objectives: achieve sub-200ms p95 latency at 1,000 RPS, maintain <0.5% error rate under sustained load, and validate autoscaling behaviour using K6 load testing with Prometheus/Grafana observability.`,
    },
    {
      id: "problem",
      title: "The Problem",
      type: "text",
      content: `Before introducing proper load balancing, a single-replica deployment of the product-service handled all catalog requests. During a simulated flash sale scenario (modelled via K6), p95 latency climbed to 1,800ms and the error rate hit 14% at just 300 concurrent users — well below real-world peak.

Root causes identified:
• Single pod = single point of failure. Any restart or OOM kill caused full downtime.
• No connection pool sizing — HikariCP defaults (maximumPoolSize: 10) caused queue exhaustion under load.
• The Nginx Ingress was not configured for upstream keepalives, causing TCP connection overhead on every request.
• No circuit breaker — a slow downstream inventory-service caused cascading timeouts up the chain.`,
    },
    {
      id: "architecture",
      title: "Architecture",
      type: "diagram",
    },
    //     {
    //       id: "implementation",
    //       title: "Kubernetes Configuration",
    //       type: "code",
    //       snippets: [
    //         {
    //           label: "Deployment — product-service (4 replicas)",
    //           language: "yaml",
    //           code: `apiVersion: apps/v1
    // kind: Deployment
    // metadata:
    //   name: product-service
    //   namespace: ecommerce
    //   labels:
    //     app: product-service
    //     version: v1
    // spec:
    //   replicas: 4
    //   selector:
    //     matchLabels:
    //       app: product-service
    //   strategy:
    //     type: RollingUpdate
    //     rollingUpdate:
    //       maxSurge: 1
    //       maxUnavailable: 0
    //   template:
    //     metadata:
    //       labels:
    //         app: product-service
    //       annotations:
    //         prometheus.io/scrape: "true"
    //         prometheus.io/port: "8080"
    //         prometheus.io/path: "/actuator/prometheus"
    //     spec:
    //       containers:
    //         - name: product-service
    //           image: narayana/product-service:latest
    //           ports:
    //             - containerPort: 8080
    //           env:
    //             - name: SPRING_PROFILES_ACTIVE
    //               value: kube
    //           resources:
    //             requests:
    //               cpu: "250m"
    //               memory: "256Mi"
    //             limits:
    //               cpu: "500m"
    //               memory: "512Mi"
    //           readinessProbe:
    //             httpGet:
    //               path: /actuator/health/readiness
    //               port: 8080
    //             initialDelaySeconds: 20
    //             periodSeconds: 10
    //           livenessProbe:
    //             httpGet:
    //               path: /actuator/health/liveness
    //               port: 8080
    //             initialDelaySeconds: 30
    //             periodSeconds: 15`,
    //         },
    //         {
    //           label: "HPA — Horizontal Pod Autoscaler",
    //           language: "yaml",
    //           code: `apiVersion: autoscaling/v2
    // kind: HorizontalPodAutoscaler
    // metadata:
    //   name: product-service-hpa
    //   namespace: ecommerce
    // spec:
    //   scaleTargetRef:
    //     apiVersion: apps/v1
    //     kind: Deployment
    //     name: product-service
    //   minReplicas: 2
    //   maxReplicas: 10
    //   metrics:
    //     - type: Resource
    //       resource:
    //         name: cpu
    //         target:
    //           type: Utilization
    //           averageUtilization: 60
    //     - type: Resource
    //       resource:
    //         name: memory
    //         target:
    //           type: Utilization
    //           averageUtilization: 70`,
    //         },
    //         {
    //           label: "Nginx Ingress — keepalive + load balancing",
    //           language: "yaml",
    //           code: `apiVersion: networking.k8s.io/v1
    // kind: Ingress
    // metadata:
    //   name: api-gateway-ingress
    //   namespace: ecommerce
    //   annotations:
    //     nginx.ingress.kubernetes.io/upstream-keepalive-connections: "100"
    //     nginx.ingress.kubernetes.io/upstream-keepalive-timeout: "60"
    //     nginx.ingress.kubernetes.io/load-balance: "ewma"
    //     nginx.ingress.kubernetes.io/proxy-connect-timeout: "5"
    //     nginx.ingress.kubernetes.io/proxy-read-timeout: "30"
    //     nginx.ingress.kubernetes.io/proxy-send-timeout: "30"
    // spec:
    //   ingressClassName: nginx
    //   rules:
    //     - host: api.ecommerce.local
    //       http:
    //         paths:
    //           - path: /
    //             pathType: Prefix
    //             backend:
    //               service:
    //                 name: api-gateway
    //                 port:
    //                   number: 8080`,
    //         },
    //         {
    //           label: "HikariCP Tuning — application-kube.yml",
    //           language: "yaml",
    //           code: `spring:
    //   datasource:
    //     hikari:
    //       maximum-pool-size: 25
    //       minimum-idle: 5
    //       connection-timeout: 3000
    //       idle-timeout: 600000
    //       max-lifetime: 1800000
    //       leak-detection-threshold: 10000
    //       pool-name: ProductServicePool
    //   jpa:
    //     properties:
    //       hibernate:
    //         generate_statistics: false
    //     open-in-view: false`,
    //         },
    //       ],
    //     },
    {
      id: "load-testing",
      title: "Load Testing Strategy",
      type: "text",
      content: `All load tests were executed using K6 with staged ramp-up scenarios to simulate realistic traffic patterns. Three scenarios were tested:

Scenario A — Baseline (no load balancing, single replica, default HikariCP): establishes the performance floor.
Scenario B — 4 replicas, default Nginx (round-robin), tuned HikariCP: isolates the effect of horizontal scaling.
Scenario C — 4→10 replicas via HPA, EWMA load balancing, keepalive connections: full production configuration.

Each scenario ran for 10 minutes with a ramp-up from 0 → 1,000 VUs over the first 2 minutes. Metrics collected: request rate (RPS), p50/p95/p99 latency, error rate, pod CPU/memory utilisation, and HPA scale events.`,
    },
    {
      id: "results",
      title: "Performance Results",
      type: "metrics-table",
      data: [
        {
          scenario: "A — Baseline",
          replicas: "1",
          config: "Default HikariCP, Round-Robin",
          rps: "300",
          p50: "320ms",
          p95: "1,800ms",
          p99: "4,200ms",
          errorRate: "14.2%",
          status: "fail",
        },
        {
          scenario: "B — Scaled",
          replicas: "4",
          config: "Tuned HikariCP, Round-Robin",
          rps: "1,000",
          p50: "85ms",
          p95: "210ms",
          p99: "480ms",
          errorRate: "1.1%",
          status: "partial",
        },
        {
          scenario: "C — Full Config",
          replicas: "4→10 (HPA)",
          config: "Tuned HikariCP, EWMA, Keepalive",
          rps: "1,000",
          p50: "62ms",
          p95: "148ms",
          p99: "290ms",
          errorRate: "0.18%",
          status: "pass",
        },
      ]
    },
    {
      id: "latency-breakdown",
      title: "Latency Breakdown",
      type: "heatmap",
      data: {
        rows: ["Scenario A", "Scenario B", "Scenario C"],
        cols: ["p10", "p25", "p50", "p75", "p90", "p95", "p99"],
        values: [
          [45, 110, 320, 900, 1400, 1800, 4200],
          [30, 55, 85, 140, 185, 210, 480],
          [18, 35, 62, 95, 128, 148, 290],
        ],
      }
    },
    {
      id: "comparison",
      title: "Load Balancing Strategy Comparison",
      type: "comparison-table",
      data: [
        {
          strategy: "Round Robin",
          distribution: "Equal",
          latencyFairness: "Low",
          sessionAffinity: "No",
          complexity: "Low",
          bestFor: "Uniform request cost",
          score: 60,
        },
        {
          strategy: "Least Connections",
          distribution: "Connection-aware",
          latencyFairness: "Medium",
          sessionAffinity: "No",
          complexity: "Medium",
          bestFor: "Variable-duration requests",
          score: 75,
        },
        {
          strategy: "IP Hash",
          distribution: "Client-based",
          latencyFairness: "Low",
          sessionAffinity: "Yes",
          complexity: "Low",
          bestFor: "Stateful sessions",
          score: 55,
        },
        {
          strategy: "EWMA ✓",
          distribution: "Latency-weighted",
          latencyFairness: "High",
          sessionAffinity: "No",
          complexity: "Medium",
          bestFor: "Mixed fast/slow requests",
          score: 92,
        },
        {
          strategy: "Random",
          distribution: "Random",
          latencyFairness: "Low",
          sessionAffinity: "No",
          complexity: "Very Low",
          bestFor: "Simple homogenous traffic",
          score: 45,
        },
      ]
    },
    {
      id: "metric-cards",
      title: "Key Outcomes",
      type: "metric-cards",
      data: [
        { label: "p95 Improvement", value: "92%", sub: "1,800ms → 148ms", color: "#22C55E", icon: "⚡" },
        { label: "Error Rate Reduction", value: "98.7%", sub: "14.2% → 0.18%", color: "#6366F1", icon: "🛡️" },
        { label: "Peak Throughput", value: "1,000 RPS", sub: "sustained, 10 min", color: "#22D3EE", icon: "🚀" },
        { label: "Max Pod Scale", value: "10 pods", sub: "HPA: 2 → 10", color: "#F59E0B", icon: "📈" },
      ]
    },
    {
      id: "timeline",
      title: "Implementation Timeline",
      type: "timeline",
      data: [
        { week: "Week 1", title: "Infrastructure Setup", detail: "Kubernetes cluster setup (OrbStack), namespace, RBAC, Nginx Ingress, PostgreSQL/MongoDB/Redis StatefulSets, config-server deployment with profile-based config." },
        { week: "Week 2", title: "Service Deployment", detail: "All 10 microservices containerised (multi-stage Maven builds), Dockerfiles, K8s Deployments and ClusterIP Services, readiness/liveness probes aligned with Spring Boot Actuator." },
        { week: "Week 3", title: "Observability Stack", detail: "Prometheus scrape config, 45-panel Grafana dashboard, Zipkin distributed tracing, Micrometer instrumentation across all services, HikariCP metrics exposed." },
        { week: "Week 4", title: "Load Testing & Tuning", detail: "K6 scripts (ramp scenarios), baseline test reveals HikariCP exhaustion. HikariCP pool size tuned to 25. Nginx EWMA + keepalive configured. HPA policies validated." },
        { week: "Week 5", title: "Validation & Docs", detail: "Final K6 run confirms targets met (p95 148ms, error 0.18%). Architecture diagrams, case study writeup, GitHub repository cleaned and published." },
      ]
    },
    {
      id: "lessons",
      title: "Lessons Learned",
      type: "text",
      content: `1. HikariCP defaults are a silent killer under load. maximumPoolSize: 10 is fine for development but will queue-exhaust at modest concurrency. Size the pool relative to your replica count and expected concurrent queries.

2. Nginx EWMA outperforms round-robin for services with variable response times. When some requests hit cache (fast) and others hit the DB (slow), round-robin accumulates queue depth unevenly. EWMA routes new connections to pods with the lowest weighted moving average response time.

3. Readiness probes must match your actual startup time. If your Spring Boot service takes 25 seconds to warm up JPA/Hibernate but your probe fires at 10s, Kubernetes marks the pod ready prematurely and load balancer routes traffic to an unprepared pod, causing a spike in errors during rolling deployments.

4. Keepalive connections are not optional at scale. At 1,000 RPS, without keepalive, TCP handshake overhead adds ~8ms per request. With 100 upstream keepalive connections configured on Nginx, this overhead drops to near-zero.

5. Observe before you optimise. Prometheus + Grafana gave us the exact signal (HikariCP connection wait time metric) that pointed us to the pool exhaustion issue. Without observability, this would have been guesswork.`,
    },
    {
      id: "future",
      title: "What's Next",
      type: "text",
      content: `• Istio service mesh for mTLS, fine-grained traffic shaping, and circuit breaking at the sidecar layer — currently using Resilience4j circuit breakers in-process.
• KEDA (Kubernetes Event-Driven Autoscaling) to scale consumers based on Kafka consumer group lag rather than CPU, enabling event-driven scale-down to zero.
• Canary deployments via Argo Rollouts with automated p99 latency gates — roll back automatically if a new image degrades p99 by >20%.
• Vertical Pod Autoscaler (VPA) to right-size resource requests based on historical usage, reducing wasted cluster capacity.`,
    },
  ],
};

const BlogPost = () => {
  const sectionRefs = useRef({});
  const [activeSection, setActiveSection] = useState("overview");

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.dataset.sectionId);
          }
        });
      },
      { rootMargin: "-10% 0px -80% 0px" }
    );

    Object.entries(sectionRefs.current).forEach(([, el]) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = sectionRefs.current[id];
    if (!element) return;

    const offset = 120; // ✅ your desired top space
    const y =
      element.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <CoverSection blogData={blogData} />
      <Container maxWidth="xl" sx={{ pt: 8, pb: 2 }}>
        <Grid container spacing={5}>
          {/* SIDEBAR */}
          <Grid size={{ xs: 12, md: 4 }}>
            <BlogSidebar blogData={blogData} activeSection={activeSection} onNavigate={scrollToSection} />
          </Grid>
          {/* MAIN CONTENT */}
          <Grid size={{ xs: 12, md: 8 }}>
            {blogData.sections.map((section) => (
              <Box
                key={section.id}
                ref={(el) => (sectionRefs.current[section.id] = el)}
                data-section-id={section.id}
                sx={{ mb: 10 }}
              >
                <BlogSectionHeader title={section.title} id={section.id} />

                {section.type === "text" && <BlogTextSection content={section.content} />}
                {section.type === "diagram" && <ArchitectureDiagram />}
                {/* {section.type === "code" && <CodeSection snippets={section.snippets} />} */}
                {section.type === "metrics-table" && <MetricsTable data={section?.data} />}
                {section.type === "comparison-table" && <ComparisonTable data={section?.data} />}
                {section.type === "metric-cards" && <MetricCards data={section?.data} />}
                {section.type === "timeline" && <Timeline data={section?.data} />}
                {section.type === "heatmap" && <LatencyHeatmap data={section?.data} />}
              </Box>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BlogPost;