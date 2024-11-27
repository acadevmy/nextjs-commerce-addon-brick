import 'dart:io';
import 'package:mason/mason.dart';

void run(HookContext context) async {
  await moveAppToAppLocale(context: context);
}

Future<void> moveAppToAppLocale({
  required HookContext context,
}) async {
  context.logger.info(
      '📦 Preparing to move src/app to src/app/[locale] (only page.tsx and route.ts files related to Next.js app router will be moved)...');
  final appPath = 'src/app';

// 1. Create new folder src/app/[locale]
  final localePath = '$appPath/[locale]';
  Directory(localePath).createSync(recursive: true);

// 2. Move existing folders containing page.tsx or route.ts from src/app to src/app/[locale]
  final sourceDir = Directory(appPath);
  if (sourceDir.existsSync()) {
    sourceDir.listSync().whereType<Directory>().forEach((dir) {
      final containsRelevantFile = dir.listSync().any((file) {
        final fileName = file.uri.pathSegments.last;
        return fileName == 'page.tsx' || fileName == 'route.ts';
      });

      if (containsRelevantFile) {
        // Move folder
        final newPath = dir.path.replaceFirst(appPath, localePath);
        Directory(newPath).createSync(recursive: true);
        dir.renameSync(newPath);
      }
    });
  }

  final topLevelPageFile = File('$appPath/page.tsx');
  if (topLevelPageFile.existsSync()) {
    final newPath = '$localePath/page.tsx';
    topLevelPageFile.renameSync(newPath);
  }

  context.logger
      .success('✅ Successfully moved src/app to src/app/[locale]! 🚀');
}
