import { RouteRecordRaw } from "vue-router";

const routeChildrenMain: RouteRecordRaw[] = [
  {
    path: "0",
    component: () => import("pages/_0_/HelloOpenCVPage.vue"),
    meta: {
      title: "入门",
      caption: "Hello OpenCV.js",
      icon: "mdi-numeric-0-box-outline",
      link: "https://docs.opencv.org/4.5.0/d0/d84/tutorial_js_usage.html",
    },
  },
  {
    path: "1",
    component: () => import("pages/_1_/ImageIOPage.vue"),
    meta: {
      title: "图像 IO（灰度）",
      caption: "Image Read and Show Example",
      icon: "mdi-numeric-1-box-outline",
      link: "https://docs.opencv.org/4.5.0/df/d24/tutorial_js_image_display.html",
    },
  },
  {
    path: "2",
    component: () => import("pages/_2_/ImageROIPage.vue"),
    meta: {
      title: "图像区域截图",
      caption: "Image ROI Example",
      icon: "mdi-numeric-2-box-outline",
      link: "https://docs.opencv.org/4.5.0/de/d06/tutorial_js_basic_ops.html",
    },
  },
  {
    path: "3-1",
    component: () => import("pages/_3_/_1_/ImageInRangePage.vue"),
    meta: {
      title: "图像色彩变更",
      caption: "Image InRange Example",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/db/d64/tutorial_js_colorspaces.html",
    },
  },
  {
    path: "3-2-1",
    component: () => import("pages/_3_/_2_/ImageResizePage.vue"),
    meta: {
      title: "图像缩放变换",
      caption: "Image Resize Example",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/dd/d52/tutorial_js_geometric_transformations.html",
    },
  },
  {
    path: "3-2-2",
    component: () => import("pages/_3_/_2_/ImageRotateTransformPage.vue"),
    meta: {
      title: "图像旋转变换",
      caption: "Rotate Transform Example",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/dd/d52/tutorial_js_geometric_transformations.html",
    },
  },
  {
    path: "3-2-3",
    component: () => import("pages/_3_/_2_/ImageAffineTransformPage.vue"),
    meta: {
      title: "图像仿射变换",
      caption: "Get Affine Transform Example",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/dd/d52/tutorial_js_geometric_transformations.html",
    },
  },
  {
    path: "3-2-4",
    component: () => import("pages/_3_/_2_/ImagePerspectivTransformPage.vue"),
    meta: {
      title: "图像透视变换",
      caption: "Perspectiv Transform Example",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/dd/d52/tutorial_js_geometric_transformations.html",
    },
  },
  {
    path: "3-3-1",
    component: () => import("pages/_3_/_3_/ImageThresholdPage.vue"),
    meta: {
      title: "图像简单阈值",
      caption: "Image Threshold Example",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/d7/dd0/tutorial_js_thresholding.html",
    },
  },
  {
    path: "3-3-2",
    component: () => import("pages/_3_/_3_/ImageAdaptiveThresholdPage.vue"),
    meta: {
      title: "图像自适阈值",
      caption: "Adaptive Threshold Example",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/d7/dd0/tutorial_js_thresholding.html",
    },
  },
  {
    path: "3-4-1",
    component: () => import("pages/_3_/_4_/ImageFilterPage.vue"),
    meta: {
      title: "图像简单过滤",
      caption: "Image Filter Example",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/dd/d6a/tutorial_js_filtering.html",
    },
  },
  {
    path: "3-4-2",
    component: () => import("pages/_3_/_4_/ImageAveragingBlurPage.vue"),
    meta: {
      title: "图像均值滤波",
      caption: "Image Blur Example",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/dd/d6a/tutorial_js_filtering.html",
    },
  },
  {
    path: "3-4-3",
    component: () => import("pages/_3_/_4_/ImageAveragingBoxFilterPage.vue"),
    meta: {
      title: "图像方框滤波",
      caption: "Image Blur Example",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/dd/d6a/tutorial_js_filtering.html",
    },
  },
  {
    path: "3-4-4",
    component: () => import("pages/_3_/_4_/ImageGaussianBlurPage.vue"),
    meta: {
      title: "图像高斯滤波",
      caption: "Gaussian Blur Example",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/dd/d6a/tutorial_js_filtering.html",
    },
  },
  {
    path: "3-4-5",
    component: () => import("pages/_3_/_4_/ImageMedianBlurPage.vue"),
    meta: {
      title: "图像中值滤波",
      caption: "Median Blur Example",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/dd/d6a/tutorial_js_filtering.html",
    },
  },
  {
    path: "3-4-6",
    component: () => import("pages/_3_/_4_/ImageBilateralFilterPage.vue"),
    meta: {
      title: "图像双边滤波",
      caption: "Bilateral Filter Example",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/dd/d6a/tutorial_js_filtering.html",
    },
  },
  {
    path: "3-5-1",
    component: () => import("pages/_3_/_5_/ImageErodePage.vue"),
    meta: {
      title: "图像形态腐蚀",
      caption: "Image Erode Example",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/d4/d76/tutorial_js_morphological_ops.html",
    },
  },
  {
    path: "3-5-2",
    component: () => import("pages/_3_/_5_/ImageDilatePage.vue"),
    meta: {
      title: "图像形态膨胀",
      caption: "Image Dilate Example",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/d4/d76/tutorial_js_morphological_ops.html",
    },
  },
  {
    path: "3-5-3",
    component: () => import("pages/_3_/_5_/ImageOpeningPage.vue"),
    meta: {
      title: "图像形态正开",
      caption: "开运算 = 先腐蚀，再膨胀",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/d4/d76/tutorial_js_morphological_ops.html",
    },
  },
  {
    path: "3-5-4",
    component: () => import("pages/_3_/_5_/ImageClosingPage.vue"),
    meta: {
      title: "图像形态逆闭",
      caption: "闭运算 = 先膨胀，再腐蚀",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/d4/d76/tutorial_js_morphological_ops.html",
    },
  },
  {
    path: "3-5-5",
    component: () => import("pages/_3_/_5_/ImageGradientPage.vue"),
    meta: {
      title: "图像形态梯度",
      caption: "梯度运算 = 膨胀结果 - 腐蚀结果",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/d4/d76/tutorial_js_morphological_ops.html",
    },
  },
  {
    path: "3-5-6",
    component: () => import("pages/_3_/_5_/ImageHatPage.vue"),
    meta: {
      title: "图像形态礼帽",
      caption: "礼帽运算 = 原始输入 - 开运算结果",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/d4/d76/tutorial_js_morphological_ops.html",
    },
  },
  {
    path: "3-5-7",
    component: () => import("pages/_3_/_5_/ImageBlackHatPage.vue"),
    meta: {
      title: "图像形态黑帽",
      caption: "黑帽运算 = 闭运算结果 - 原始输入",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/d4/d76/tutorial_js_morphological_ops.html",
    },
  },
  {
    path: "3-5-8",
    component: () => import("pages/_3_/_5_/ImageGradientStructuringElementPage.vue"),
    meta: {
      title: "图像形态结构",
      caption: "Get Structuring Element Example",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/d4/d76/tutorial_js_morphological_ops.html",
    },
  },
  {
    path: "3-6-1",
    component: () => import("pages/_3_/_6_/ImageGradientSobelPage.vue"),
    meta: {
      title: "图像梯度 Sobel",
      caption: "Image Sobel Example",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/da/d85/tutorial_js_gradients.html",
    },
  },
  {
    path: "3-6-2",
    component: () => import("pages/_3_/_6_/ImageGradientScharrPage.vue"),
    meta: {
      title: "图像梯度 Scharr",
      caption: "Image Sobel Example",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/da/d85/tutorial_js_gradients.html",
    },
  },
  {
    path: "3-6-3",
    component: () => import("pages/_3_/_6_/ImageGradientLaplacianPage.vue"),
    meta: {
      title: "图像梯度 Laplacian",
      caption: "Image Laplacian Example",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/da/d85/tutorial_js_gradients.html",
    },
  },
  {
    path: "3-6-4",
    component: () => import("pages/_3_/_6_/ImageGradientAbsSobelPage.vue"),
    meta: {
      title: "图像梯度 AbsSobel",
      caption: "Image AbsSobel Example",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/da/d85/tutorial_js_gradients.html",
    },
  },
  {
    path: "3-7",
    component: () => import("pages/_3_/_7_/ImageCannyPage.vue"),
    meta: {
      title: "图像边缘 Canny",
      caption: "Image Canny Example",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/d7/de1/tutorial_js_canny.html",
    },
  },
  {
    path: "3-8-1",
    component: () => import("pages/_3_/_8_/ImagePyrDownPage.vue"),
    meta: {
      title: "图像下金字塔",
      caption: "Image PyrDown Example",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/d5/d0f/tutorial_js_pyramids.html",
    },
  },
  {
    path: "3-8-2",
    component: () => import("pages/_3_/_8_/ImagePyrUpPage.vue"),
    meta: {
      title: "图像上金字塔",
      caption: "Image PyrUp Example",
      icon: "mdi-numeric-3-box-outline",
      link: "https://docs.opencv.org/4.5.0/d5/d0f/tutorial_js_pyramids.html",
    },
  },
  {
    path: "4-1",
    component: () => import("pages/_4_/_1_/ImageContoursPage.vue"),
    meta: {
      title: "图像边缘检测",
      caption: "Image Contours Example",
      icon: "mdi-numeric-4-box-outline",
      link: "https://docs.opencv.org/4.5.0/d5/daa/tutorial_js_contours_begin.html",
    },
  },
  {
    path: "4-2-1",
    component: () => import("pages/_4_/_2_/ImageContoursApproxPolyDPPage.vue"),
    meta: {
      title: "图像边缘近似多边",
      caption: "Image ApproxPolyDP Example",
      icon: "mdi-numeric-4-box-outline",
      link: "https://docs.opencv.org/4.5.0/dc/dcf/tutorial_js_contour_features.html",
    },
  },
  {
    path: "4-2-2",
    component: () => import("pages/_4_/_2_/ImageContoursConvexHullPage.vue"),
    meta: {
      title: "图像边缘凸出外壳",
      caption: "Convex Hull Example",
      icon: "mdi-numeric-4-box-outline",
      link: "https://docs.opencv.org/4.5.0/dc/dcf/tutorial_js_contour_features.html",
    },
  },
  {
    path: "4-2-3",
    component: () => import("pages/_4_/_2_/ImageContoursBoundingRectPage.vue"),
    meta: {
      title: "图像边缘最小矩形",
      caption: "Bounding Rect Example",
      icon: "mdi-numeric-4-box-outline",
      link: "https://docs.opencv.org/4.5.0/dc/dcf/tutorial_js_contour_features.html",
    },
  },
  {
    path: "4-2-4",
    component: () => import("pages/_4_/_2_/ImageContoursMinAreaRectPage.vue"),
    meta: {
      title: "图像边缘最小矩面",
      caption: "Min Area Rect Example",
      icon: "mdi-numeric-4-box-outline",
      link: "https://docs.opencv.org/4.5.0/dc/dcf/tutorial_js_contour_features.html",
    },
  },
  {
    path: "4-2-5",
    component: () => import("pages/_4_/_2_/ImageContoursMinEnclosingCirclePage.vue"),
    meta: {
      title: "图像边缘最小圆形",
      caption: "Min Enclosing Circle Example",
      icon: "mdi-numeric-4-box-outline",
      link: "https://docs.opencv.org/4.5.0/dc/dcf/tutorial_js_contour_features.html",
    },
  },
  {
    path: "4-2-6",
    component: () => import("pages/_4_/_2_/ImageContoursFitEllipsePage.vue"),
    meta: {
      title: "图像边缘拟合椭圆",
      caption: "Fit Ellipse Example",
      icon: "mdi-numeric-4-box-outline",
      link: "https://docs.opencv.org/4.5.0/dc/dcf/tutorial_js_contour_features.html",
    },
  },
  {
    path: "4-2-7",
    component: () => import("pages/_4_/_2_/ImageContoursFitLinePage.vue"),
    meta: {
      title: "图像边缘拟合直线",
      caption: "Fit Line Example",
      icon: "mdi-numeric-4-box-outline",
      link: "https://docs.opencv.org/4.5.0/dc/dcf/tutorial_js_contour_features.html",
    },
  },
  {
    path: "4-3",
    component: () => import("pages/_4_/_3_/ImageTransposePage.vue"),
    meta: {
      title: "图像转置",
      caption: "Image Transpose Example",
      icon: "mdi-numeric-4-box-outline",
      link: "https://docs.opencv.org/4.5.0/da/dc1/tutorial_js_contour_properties.html",
    },
  },
  {
    path: "5-1",
    component: () => import("pages/_5_/ImageHoughLinesPage.vue"),
    meta: {
      title: "图像霍夫线变换",
      caption: "Hough Lines Example",
      icon: "mdi-numeric-5-box-outline",
      link: "https://docs.opencv.org/4.5.0/d3/de6/tutorial_js_houghlines.html",
    },
  },
  {
    path: "5-2",
    component: () => import("pages/_5_/ImageHoughLinesPPage.vue"),
    meta: {
      title: "图像概率霍夫线变换",
      caption: "Image HoughLinesP Example",
      icon: "mdi-numeric-5-box-outline",
      link: "https://docs.opencv.org/4.5.0/d3/de6/tutorial_js_houghlines.html",
    },
  },
  {
    path: "5-3",
    component: () => import("pages/_5_/ImageHoughCirclesPage.vue"),
    meta: {
      title: "图像霍夫圆变换",
      caption: "Hough Circles Example",
      icon: "mdi-numeric-5-box-outline",
      link: "https://docs.opencv.org/4.5.0/d3/de5/tutorial_js_houghcircles.html",
    },
  },
  {
    path: "6-1",
    component: () => import("pages/_6_/ImageThresholdPage.vue"),
    meta: {
      title: "图像模版匹配",
      caption: "Image Threshold Example",
      icon: "mdi-numeric-6-box-outline",
      link: "https://docs.opencv.org/4.5.0/d7/d1c/tutorial_js_watershed.html",
    },
  },
  {
    path: "7",
    component: () => import("pages/_7_/ImageTemplateMatchPage.vue"),
    meta: {
      title: "图像模版匹配",
      caption: "Template Match Example",
      icon: "mdi-numeric-7-box-outline",
      link: "https://docs.opencv.org/4.5.0/d8/dd1/tutorial_js_template_matching.html",
    },
  },
];

export default routeChildrenMain;
