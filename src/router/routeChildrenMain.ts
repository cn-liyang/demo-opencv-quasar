import { RouteRecordRaw } from "vue-router";

const routeChildrenMain: RouteRecordRaw[] = [
  {
    path: "01",
    component: () => import("pages/_0_intro/HelloOpenCVPage.vue"),
    meta: {
      title: "入门",
      caption: "Hello OpenCV.js",
      icon: "mdi-seed-outline",
      link: "https://docs.opencv.org/4.5.0/d0/d84/tutorial_js_usage.html",
    },
  },
  {
    path: "02",
    component: () => import("pages/_0_intro/ImageIOPage.vue"),
    meta: {
      title: "图像 IO（灰度）",
      caption: "Image Read and Show Example",
      icon: "mdi-seed-plus-outline",
      link: "https://docs.opencv.org/4.5.0/df/d24/tutorial_js_image_display.html",
    },
  },
  {
    path: "11",
    component: () => import("pages/_1_image/_1_core/ImageROIPage.vue"),
    meta: {
      title: "图像区域截图",
      caption: "Image ROI Example",
      icon: "mdi-face-recognition",
      link: "https://docs.opencv.org/4.5.0/de/d06/tutorial_js_basic_ops.html",
    },
  },
  {
    path: "12",
    component: () => import("pages/_1_image/_2_color/ImageInRangePage.vue"),
    meta: {
      title: "图像色彩变更",
      caption: "Image InRange Example",
      icon: "mdi-format-color-fill",
      link: "https://docs.opencv.org/4.5.0/db/d64/tutorial_js_colorspaces.html",
    },
  },
  {
    path: "131",
    component: () => import("pages/_1_image/_3_geometry/Image1ResizePage.vue"),
    meta: {
      title: "图像缩放变换",
      caption: "Image Resize Example",
      icon: "mdi-panorama-variant-outline",
      link: "https://docs.opencv.org/4.5.0/dd/d52/tutorial_js_geometric_transformations.html",
    },
  },
  {
    path: "132",
    component: () => import("pages/_1_image/_3_geometry/Image2RotateTransformPage.vue"),
    meta: {
      title: "图像旋转变换",
      caption: "Rotate Transform Example",
      icon: "mdi-image-refresh-outline",
      link: "https://docs.opencv.org/4.5.0/dd/d52/tutorial_js_geometric_transformations.html",
    },
  },
  {
    path: "133",
    component: () => import("pages/_1_image/_3_geometry/Image3AffineTransformPage.vue"),
    meta: {
      title: "图像仿射变换",
      caption: "Get Affine Transform Example",
      icon: "mdi-panorama-vertical-outline",
      link: "https://docs.opencv.org/4.5.0/dd/d52/tutorial_js_geometric_transformations.html",
    },
  },
  {
    path: "134",
    component: () => import("pages/_1_image/_3_geometry/Image4PerspectiveTransformPage.vue"),
    meta: {
      title: "图像透视变换",
      caption: "Perspective Transform Example",
      icon: "mdi-panorama-vertical",
      link: "https://docs.opencv.org/4.5.0/dd/d52/tutorial_js_geometric_transformations.html",
    },
  },
  {
    path: "141",
    component: () => import("pages/_1_image/_4_thresholding/Image1ThresholdPage.vue"),
    meta: {
      title: "图像阈值",
      caption: "Image Threshold Example",
      icon: "mdi-image-filter-black-white",
      link: "https://docs.opencv.org/4.5.0/d7/dd0/tutorial_js_thresholding.html",
    },
  },
  {
    path: "142",
    component: () => import("pages/_1_image/_4_thresholding/Image2AdaptiveThresholdPage.vue"),
    meta: {
      title: "图像自适阈值",
      caption: "Adaptive Threshold Example",
      icon: "mdi-image-filter-black-white",
      link: "https://docs.opencv.org/4.5.0/d7/dd0/tutorial_js_thresholding.html",
    },
  },
  {
    path: "151",
    component: () => import("pages/_1_image/_5_smoothing/Image1FilterPage.vue"),
    meta: {
      title: "图像简单过滤",
      caption: "Image Filter Example",
      icon: "mdi-image-auto-adjust",
      link: "https://docs.opencv.org/4.5.0/dd/d6a/tutorial_js_filtering.html",
    },
  },
  {
    path: "152",
    component: () => import("pages/_1_image/_5_smoothing/Image2AveragingBlurPage.vue"),
    meta: {
      title: "图像均值滤波",
      caption: "Image Blur Example",
      icon: "mdi-image-auto-adjust",
      link: "https://docs.opencv.org/4.5.0/dd/d6a/tutorial_js_filtering.html",
    },
  },
  {
    path: "153",
    component: () => import("pages/_1_image/_5_smoothing/Image3AveragingBoxFilterPage.vue"),
    meta: {
      title: "图像方框滤波",
      caption: "Image Blur Example",
      icon: "mdi-image-auto-adjust",
      link: "https://docs.opencv.org/4.5.0/dd/d6a/tutorial_js_filtering.html",
    },
  },
  {
    path: "154",
    component: () => import("pages/_1_image/_5_smoothing/Image4GaussianBlurPage.vue"),
    meta: {
      title: "图像高斯滤波",
      caption: "Gaussian Blur Example",
      icon: "mdi-image-auto-adjust",
      link: "https://docs.opencv.org/4.5.0/dd/d6a/tutorial_js_filtering.html",
    },
  },
  {
    path: "155",
    component: () => import("pages/_1_image/_5_smoothing/Image5MedianBlurPage.vue"),
    meta: {
      title: "图像中值滤波",
      caption: "Median Blur Example",
      icon: "mdi-image-auto-adjust",
      link: "https://docs.opencv.org/4.5.0/dd/d6a/tutorial_js_filtering.html",
    },
  },
  {
    path: "156",
    component: () => import("pages/_1_image/_5_smoothing/Image6BilateralFilterPage.vue"),
    meta: {
      title: "图像双边滤波",
      caption: "Bilateral Filter Example",
      icon: "mdi-image-auto-adjust",
      link: "https://docs.opencv.org/4.5.0/dd/d6a/tutorial_js_filtering.html",
    },
  },
  {
    path: "161",
    component: () => import("pages/_1_image/_6_morphology/Image1ErodePage.vue"),
    meta: {
      title: "图像形态腐蚀",
      caption: "Image Erode Example",
      icon: "mdi-panorama-horizontal-outline",
      link: "https://docs.opencv.org/4.5.0/d4/d76/tutorial_js_morphological_ops.html",
    },
  },
  {
    path: "162",
    component: () => import("pages/_1_image/_6_morphology/Image2DilatePage.vue"),
    meta: {
      title: "图像形态膨胀",
      caption: "Image Dilate Example",
      icon: "mdi-panorama-wide-angle-outline",
      link: "https://docs.opencv.org/4.5.0/d4/d76/tutorial_js_morphological_ops.html",
    },
  },
  {
    path: "163",
    component: () => import("pages/_1_image/_6_morphology/Image3OpeningPage.vue"),
    meta: {
      title: "图像形态正开",
      caption: "开运算 = 先腐蚀，再膨胀",
      icon: "mdi-panorama-horizontal",
      link: "https://docs.opencv.org/4.5.0/d4/d76/tutorial_js_morphological_ops.html",
    },
  },
  {
    path: "164",
    component: () => import("pages/_1_image/_6_morphology/Image4ClosingPage.vue"),
    meta: {
      title: "图像形态逆闭",
      caption: "闭运算 = 先膨胀，再腐蚀",
      icon: "mdi-panorama-wide-angle",
      link: "https://docs.opencv.org/4.5.0/d4/d76/tutorial_js_morphological_ops.html",
    },
  },
  {
    path: "165",
    component: () => import("pages/_1_image/_6_morphology/Image5GradientPage.vue"),
    meta: {
      title: "图像形态梯度",
      caption: "梯度运算 = 膨胀结果 - 腐蚀结果",
      icon: "mdi-gradient-horizontal",
      link: "https://docs.opencv.org/4.5.0/d4/d76/tutorial_js_morphological_ops.html",
    },
  },
  {
    path: "166",
    component: () => import("pages/_1_image/_6_morphology/Image6HatPage.vue"),
    meta: {
      title: "图像形态礼帽",
      caption: "礼帽运算 = 原始输入 - 开运算结果",
      icon: "mdi-hat-fedora",
      link: "https://docs.opencv.org/4.5.0/d4/d76/tutorial_js_morphological_ops.html",
    },
  },
  {
    path: "167",
    component: () => import("pages/_1_image/_6_morphology/Image7BlackHatPage.vue"),
    meta: {
      title: "图像形态黑帽",
      caption: "黑帽运算 = 闭运算结果 - 原始输入",
      icon: "mdi-redhat",
      link: "https://docs.opencv.org/4.5.0/d4/d76/tutorial_js_morphological_ops.html",
    },
  },
  {
    path: "168",
    component: () => import("pages/_1_image/_6_morphology/Image8GradientStructuringElementPage.vue"),
    meta: {
      title: "图像形态结构",
      caption: "Get Structuring Element Example",
      icon: "mdi-star-four-points-outline",
      link: "https://docs.opencv.org/4.5.0/d4/d76/tutorial_js_morphological_ops.html",
    },
  },
  {
    path: "171",
    component: () => import("pages/_1_image/_7_gradient/Image1GradientSobelPage.vue"),
    meta: {
      title: "图像梯度 Sobel",
      caption: "Image Sobel Example",
      icon: "mdi-gradient-vertical",
      link: "https://docs.opencv.org/4.5.0/da/d85/tutorial_js_gradients.html",
    },
  },
  {
    path: "172",
    component: () => import("pages/_1_image/_7_gradient/Image2GradientScharrPage.vue"),
    meta: {
      title: "图像梯度 Scharr",
      caption: "Image Sobel Example",
      icon: "mdi-gradient-vertical",
      link: "https://docs.opencv.org/4.5.0/da/d85/tutorial_js_gradients.html",
    },
  },
  {
    path: "173",
    component: () => import("pages/_1_image/_7_gradient/Image3GradientLaplacianPage.vue"),
    meta: {
      title: "图像梯度 Laplacian",
      caption: "Image Laplacian Example",
      icon: "mdi-gradient-vertical",
      link: "https://docs.opencv.org/4.5.0/da/d85/tutorial_js_gradients.html",
    },
  },
  {
    path: "174",
    component: () => import("pages/_1_image/_7_gradient/Image4GradientAbsSobelPage.vue"),
    meta: {
      title: "图像梯度 AbsSobel",
      caption: "Image AbsSobel Example",
      icon: "mdi-gradient-vertical",
      link: "https://docs.opencv.org/4.5.0/da/d85/tutorial_js_gradients.html",
    },
  },
  {
    path: "18",
    component: () => import("pages/_1_image/_8_edge/ImageCannyPage.vue"),
    meta: {
      title: "图像边缘 Canny",
      caption: "Image Canny Example",
      icon: "mdi-gradient-vertical",
      link: "https://docs.opencv.org/4.5.0/d7/de1/tutorial_js_canny.html",
    },
  },
  {
    path: "191",
    component: () => import("pages/_1_image/_9_blending/ImagePyrDownPage.vue"),
    meta: {
      title: "图像金字塔向下混合",
      caption: "Image PyrDown Example",
      icon: "mdi-pyramid",
      link: "https://docs.opencv.org/4.5.0/d5/d0f/tutorial_js_pyramids.html",
    },
  },
  {
    path: "192",
    component: () => import("pages/_1_image/_9_blending/ImagePyrUpPage.vue"),
    meta: {
      title: "图像金字塔向上混合",
      caption: "Image PyrUp Example",
      icon: "mdi-pyramid-off",
      link: "https://docs.opencv.org/4.5.0/d5/d0f/tutorial_js_pyramids.html",
    },
  },
  {
    path: "1a1",
    component: () => import("pages/_1_image/_a_contour/Image1ContoursPage.vue"),
    meta: {
      title: "图像边缘检测",
      caption: "Image Contours Example",
      icon: "mdi-octagon-outline",
      link: "https://docs.opencv.org/4.5.0/d5/daa/tutorial_js_contours_begin.html",
    },
  },
  {
    path: "1a2",
    component: () => import("pages/_1_image/_a_contour/Image2ContoursApproxPolyDPPage.vue"),
    meta: {
      title: "图像边缘近似多边",
      caption: "Image ApproxPolyDP Example",
      icon: "mdi-hexagon-outline",
      link: "https://docs.opencv.org/4.5.0/dc/dcf/tutorial_js_contour_features.html",
    },
  },
  {
    path: "1a3",
    component: () => import("pages/_1_image/_a_contour/Image3ContoursConvexHullPage.vue"),
    meta: {
      title: "图像边缘凸出外壳",
      caption: "Convex Hull Example",
      icon: "mdi-pentagon-outline",
      link: "https://docs.opencv.org/4.5.0/dc/dcf/tutorial_js_contour_features.html",
    },
  },
  {
    path: "1a4",
    component: () => import("pages/_1_image/_a_contour/Image4ContoursBoundingRectPage.vue"),
    meta: {
      title: "图像边缘最小矩形",
      caption: "Bounding Rect Example",
      icon: "mdi-rectangle-outline",
      link: "https://docs.opencv.org/4.5.0/dc/dcf/tutorial_js_contour_features.html",
    },
  },
  {
    path: "1a5",
    component: () => import("pages/_1_image/_a_contour/Image5ContoursMinAreaRectPage.vue"),
    meta: {
      title: "图像边缘最小矩面",
      caption: "Min Area Rect Example",
      icon: "mdi-rectangle",
      link: "https://docs.opencv.org/4.5.0/dc/dcf/tutorial_js_contour_features.html",
    },
  },
  {
    path: "1a6",
    component: () => import("pages/_1_image/_a_contour/Image6ContoursMinEnclosingCirclePage.vue"),
    meta: {
      title: "图像边缘最小圆形",
      caption: "Min Enclosing Circle Example",
      icon: "mdi-circle-outline",
      link: "https://docs.opencv.org/4.5.0/dc/dcf/tutorial_js_contour_features.html",
    },
  },
  {
    path: "1a7",
    component: () => import("pages/_1_image/_a_contour/Image7ContoursFitEllipsePage.vue"),
    meta: {
      title: "图像边缘拟合椭圆",
      caption: "Fit Ellipse Example",
      icon: "mdi-ellipse-outline",
      link: "https://docs.opencv.org/4.5.0/dc/dcf/tutorial_js_contour_features.html",
    },
  },
  {
    path: "1a8",
    component: () => import("pages/_1_image/_a_contour/Image8ContoursFitLinePage.vue"),
    meta: {
      title: "图像边缘拟合直线",
      caption: "Fit Line Example",
      icon: "mdi-vector-line",
      link: "https://docs.opencv.org/4.5.0/dc/dcf/tutorial_js_contour_features.html",
    },
  },
  {
    path: "1a",
    component: () => import("pages/_1_image/_a_contour/ImageTransposePage.vue"),
    meta: {
      title: "图像转置",
      caption: "Image Transpose Example",
      icon: "mdi-image-refresh",
      link: "https://docs.opencv.org/4.5.0/da/dc1/tutorial_js_contour_properties.html",
    },
  },
  {
    path: "1b1",
    component: () => import("pages/_1_image/_b_hough/Image1HoughLinesPage.vue"),
    meta: {
      title: "图像霍夫线变换",
      caption: "Hough Lines Example",
      icon: "mdi-star-off-outline",
      link: "https://docs.opencv.org/4.5.0/d3/de6/tutorial_js_houghlines.html",
    },
  },
  {
    path: "1b2",
    component: () => import("pages/_1_image/_b_hough/Image2HoughLinesPPage.vue"),
    meta: {
      title: "图像概率霍夫线变换",
      caption: "Image HoughLinesP Example",
      icon: "mdi-star-outline",
      link: "https://docs.opencv.org/4.5.0/d3/de6/tutorial_js_houghlines.html",
    },
  },
  {
    path: "1b3",
    component: () => import("pages/_1_image/_b_hough/Image3HoughCirclesPage.vue"),
    meta: {
      title: "图像霍夫圆变换",
      caption: "Hough Circles Example",
      icon: "mdi-star-circle-outline",
      link: "https://docs.opencv.org/4.5.0/d3/de5/tutorial_js_houghcircles.html",
    },
  },
  {
    path: "1c1",
    component: () => import("pages/_1_image/_c_segment/Image1ThresholdPage.vue"),
    meta: {
      title: "图像分割阈值",
      caption: "Image Threshold Example",
      icon: "mdi-camera-metering-matrix",
      link: "https://docs.opencv.org/4.5.0/d7/d1c/tutorial_js_watershed.html",
    },
  },
  {
    path: "1c2",
    component: () => import("pages/_1_image/_c_segment/Image2BackgroundPage.vue"),
    meta: {
      title: "图像分割背景",
      caption: "Image Background Example",
      icon: "mdi-camera-metering-matrix",
      link: "https://docs.opencv.org/4.5.0/d7/d1c/tutorial_js_watershed.html",
    },
  },
  {
    path: "1c3",
    component: () => import("pages/_1_image/_c_segment/Image3ForegroundPage.vue"),
    meta: {
      title: "图像分割前景",
      caption: "Image Foreground Example",
      icon: "mdi-camera-metering-matrix",
      link: "https://docs.opencv.org/4.5.0/d7/d1c/tutorial_js_watershed.html",
    },
  },
  {
    path: "1c4",
    component: () => import("pages/_1_image/_c_segment/Image4DistanceTransformPage.vue"),
    meta: {
      title: "图像分割距离变换",
      caption: "Distance Transform Example",
      icon: "mdi-camera-metering-matrix",
      link: "https://docs.opencv.org/4.5.0/d7/d1c/tutorial_js_watershed.html",
    },
  },
  {
    path: "1c5",
    component: () => import("pages/_1_image/_c_segment/Image5WatershedPage.vue"),
    meta: {
      title: "图像分割分水岭",
      caption: "Image Watershed Example",
      icon: "mdi-camera-metering-matrix",
      link: "https://docs.opencv.org/4.5.0/d7/d1c/tutorial_js_watershed.html",
    },
  },
  {
    path: "1d",
    component: () => import("pages/_1_image/_d_template/ImageTemplateMatchPage.vue"),
    meta: {
      title: "图像模版匹配",
      caption: "Template Match Example",
      icon: "mdi-image-multiple-outline",
      link: "https://docs.opencv.org/4.5.0/d8/dd1/tutorial_js_template_matching.html",
    },
  },
  {
    path: "91",
    component: () => import("pages/_9/Card1Page.vue"),
    meta: {
      title: "证卡截图",
      caption: "OpenCV.js Tutorials",
      icon: "mdi-card-account-details-outline",
      link: "https://docs.opencv.org/4.5.0/d5/d10/tutorial_js_root.html",
    },
  },
];

export default routeChildrenMain;
